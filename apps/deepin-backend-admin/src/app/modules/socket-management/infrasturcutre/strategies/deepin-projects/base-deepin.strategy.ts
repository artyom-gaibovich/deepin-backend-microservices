export abstract class BaseDeepinStrategy {
	abstract handleStart(id: string): void;
	abstract handleStop(id: string): void;
}
