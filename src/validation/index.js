export const isNotEmpty = value => value ? undefined : 'Pole jest wymagane';

const maxLength = max => value =>
  value && value.length > max ? `Pole może mieć maksymalnie ${max} znaków` : undefined;

export const isNotPastDate = date => {
  const selectedDate = new Date(date);
  const now = new Date();
  if (selectedDate < now) {
    return 'Wybrana data nie moe być datą przeszłą';
  }
}

export const maxLength20 = maxLength(20);
