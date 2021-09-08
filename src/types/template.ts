import Partial from '../partial';
export type Mode = 'ssr' | 'ssg';

export interface Template {
    partials: Partial[],
    mode: Mode
}