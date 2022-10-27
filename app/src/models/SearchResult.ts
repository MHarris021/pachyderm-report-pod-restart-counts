export class SearchResult {
  get match(): boolean {
    return this._match;
  }
  private readonly _match: boolean;
  get lineNumber(): number {
    return this._lineNumber;
  }
  private readonly _lineNumber: number;
  get line(): string {
    return this._line;
  }
  private readonly _line: string;

  constructor(line: string, lineNumber: number, match: boolean) {
    this._line = line;
    this._lineNumber = lineNumber;
    this._match = match;
  }
}
