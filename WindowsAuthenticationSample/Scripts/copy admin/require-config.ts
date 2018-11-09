import './knockout-binding-handlers';

declare global {
    interface JQuery<TElement = HTMLElement> {
        modal: (options?: any) => void;
    }
}