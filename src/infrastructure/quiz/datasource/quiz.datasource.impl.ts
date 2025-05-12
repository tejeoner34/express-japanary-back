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
                'You are in charge of creating Japanese language quizzes. You are an expert in Japanese language instruction and test creation. You generate grammar questions in the style of the JLPT (日本語能力試験).',
            },
            {
              role: 'user',
              content: `Create 2 Japanese grammar multiple-choice questions in JLPT style (level: ${level}).

Each question must match this structure:

export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  questionText: string;
  options: Option[];
  explanation: string;
}

Requirements:
- The "questionText" must be a sentence with a blank using ＿＿＿＿.
- Include 4 answer choices in "options", with only one marked as "isCorrect": true.
- Add an "explanation" briefly describing why the correct answer is right and the grammar point it demonstrates.

Return only valid pure JSON (array of 2 Question objects). Do NOT use Markdown or code blocks.`,
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
              content: `Create 2 Japanese JLPT-style kanji questions for level ${level}.

Each question must follow this structure:

export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  questionText: string;
  options: Option[];
  explanation: string;
}

Instructions:
- Each question should test the reading or meaning of kanji (e.g., picking the correct reading or correct kanji for a word).
- Each must include exactly 4 answer choices with only one marked as correct.
- Provide a clear explanation for the correct answer and briefly why the others are incorrect.

Return ONLY valid JSON (array of 2 Question objects). Do NOT wrap the response in Markdown or use code blocks.`,
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
