export interface TableAction<T> {
    label: string;
    icon?: string;
    severity?: 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast';
    visible?: (item: T) => boolean;
    command: (item: T) => void;

    outlined?: boolean;
    variant?: 'text' | 'outlined';
    styleClass?: string;
}