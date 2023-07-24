class Category {
  public name: String;
  public created_at: Date;
  constructor(name: string, created_at: Date) {
    this.name = name;
    this.created_at = created_at;
  }
}

export { Category };
