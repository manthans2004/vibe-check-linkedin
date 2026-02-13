
export enum Tone {
  ENCORE = 'Enthusiastic & Learning',
  DIRECT = 'Direct & Impactful',
  HUMBLE = 'Humble Growth',
  SHORT = 'Short & Sweet'
}

export interface LinkedInUpdate {
  id: string;
  text: string;
  tone: Tone;
}

export interface GeneratorInputs {
  project: string;
  tools: string;
  role: string;
  company: string;
  tone: Tone;
}
