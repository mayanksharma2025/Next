export function parseFormData<T extends Record<string, any>>(
    formData?: FormData
) {
    if (!formData) {
        throw new Error(
            'FormData is undefined. Did you forget to use useActionState?'
        );
    }

    return Object.fromEntries(formData.entries()) as T;
}
