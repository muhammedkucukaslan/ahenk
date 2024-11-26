export class MessageFormatter {
  private resourceName: string;
  private customMessages?: {
    success?: string;
    error?: string;
  };

  constructor(
    resourceName: string,
    customMessages?: { success?: string; error?: string }
  ) {
    this.resourceName = resourceName;
    this.customMessages = customMessages;
  }

  formatSuccess(action: string): string {
    return this.customMessages?.success || `${this.resourceName} ${action}`;
  }

  formatError(action: string): string {
    return (
      this.customMessages?.error || `${this.resourceName} ${action} failed`
    );
  }
}
