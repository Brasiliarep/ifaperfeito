type State = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

interface Config {
  failureThreshold: number;
  successThreshold: number;
  cooldownMs: number;
}

export class CircuitBreaker {
  private state: State = 'CLOSED';
  private failureCount = 0;
  private successCount = 0;
  private lastFailureTime = 0;
  private readonly config: Config;

  constructor(config?: Partial<Config>) {
    this.config = {
      failureThreshold: 3,
      successThreshold: 2,
      cooldownMs: 30_000,
      ...config,
    };
  }

  async call<T>(fn: () => Promise<T>, fallback: () => T): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime >= this.config.cooldownMs) {
        this.transitionTo('HALF_OPEN');
      } else {
        return fallback();
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      throw err;
    }
  }

  getState(): State {
    return this.state;
  }

  reset(): void {
    this.state = 'CLOSED';
    this.failureCount = 0;
    this.successCount = 0;
    this.lastFailureTime = 0;
  }

  private onSuccess(): void {
    this.failureCount = 0;
    if (this.state === 'HALF_OPEN') {
      this.successCount++;
      if (this.successCount >= this.config.successThreshold) {
        this.transitionTo('CLOSED');
      }
    }
  }

  private onFailure(): void {
    this.lastFailureTime = Date.now();
    this.failureCount++;
    if (this.state === 'HALF_OPEN') {
      this.transitionTo('OPEN');
    } else if (this.failureCount >= this.config.failureThreshold) {
      this.transitionTo('OPEN');
    }
  }

  private transitionTo(state: State): void {
    const prev = this.state;
    this.state = state;
    if (state === 'OPEN') {
      this.successCount = 0;
    }
    if (state === 'CLOSED') {
      this.failureCount = 0;
      this.successCount = 0;
    }
  }
}
