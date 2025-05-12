import 'dotenv/config';
import axios from 'axios';
import { QuizDataSource } from '../../../domain/datasource/quiz.datasource';
import { Question } from '../../../domain/entities/quiz.entity';
import { CustomError } from '../../../domain/errors';
import { OPENAI_URL } from '../../../utils/service';

export class QuizDatasourceImpl implements QuizDataSource {
  async getGrammarQuiz(level: string): Promise<Question[]> {
    try {
      const aiResponse = await axios.post(
        OPENAI_URL,
        {
          model: 'gpt-3.5-turbo-1106',
          messages: [
            {
              role: 'system',
              content:
                'You are a in charge of creating Japanese language quizzes. You are an expert in Japanese language instruction and test creation. You generate grammar questions in the style of the JLPT (日本語能力試験).',
            },
            {
              role: 'user',
              content: `Create 10 Japanese grammar multiple-choice questions in JLPT style (level: ${level}).
Each question should be a fill-in-the-blank sentence with 4 answer choices.
Only one answer should be correct.
Each question must include:
- "questionText": the sentence with a blank (use ＿＿＿＿)
- "options": 4 answer choices with one marked as "isCorrect": true
- "explanation": a brief explanation (in English) of why the correct choice is right and what grammar point is used.

Return the result as pure JSON (no code blocks, no Markdown).`,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
          },
        }
      );

      const rawContent = aiResponse.data.choices[0].message.content;
      const jsonString = rawContent.replace(/```(?:json)?|```/g, '').trim();
      return JSON.parse(jsonString);
    } catch (err) {
      throw CustomError.badRequest('Could not make the request');
    }
  }

  async getKanjiQuiz(level: string): Promise<Question[]> {
    try {
      const aiResponse = await axios.post(
        OPENAI_URL,
        {
          model: 'gpt-3.5-turbo-1106',
          messages: [
            {
              role: 'system',
              content:
                'You are an expert in Japanese language instruction and test creation. You generate kanji questions in the style of the JLPT (日本語能力試験).',
            },
            {
              role: 'user',
              content: `Create 10 Japanese JLPT-style kanji questions based on level ${level}. Format the response as a valid JSON array of GrammarQuestion objects, using this structure:

export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface GrammarQuestion {
  questionText: string;
  options: Option[];
  explanation: string;
}

Each question should test the meaning or reading of kanji (e.g., picking the correct reading or the correct kanji for a word). Each must contain exactly 4 options with only one correct answer. Provide a clear explanation for the correct answer and briefly explain why the others are incorrect. Respond only with the JSON array, no extra commentary.`,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
          },
        }
      );

      const rawContent = aiResponse.data.choices[0].message.content;
      const jsonString = rawContent.replace(/```(?:json)?|```/g, '').trim();
      return JSON.parse(jsonString);
    } catch (err) {
      throw CustomError.badRequest('Could not make the request');
    }
  }
}
