export const validateEmail = (email: string) => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return [];

    const errors = [];
    const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    const isValidEmailFormat = emailRegex.test(trimmedEmail);
    if (!isValidEmailFormat) errors.push('Please enter a valid email address');

    return errors;
}

export const validatePassword = (password: string) => {
    if (!password) return [];

    const errors = [];
    const passwordRegex = /^[a-zA-Z\d]{6,}$/gim;
    const isValidPasswordFormat = passwordRegex.test(password);
    if (!isValidPasswordFormat) errors.push('Password must contain at least 6 characters');

    return errors;
}