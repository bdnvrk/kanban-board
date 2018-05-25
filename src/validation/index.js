export const isNotEmpty = value => value ? undefined : 'Pole jest wymagane';

const maxLength = max => value =>
  value && value.length > max ? `Pole może mieć maksymalnie ${max} znaków` : undefined;

export const isNotPastDate = date => {
  const selectedDate = new Date(date);
  const now = new Date();
  if (selectedDate <= now) {
    return 'Wybrana data nie moze być datą przeszłą';
  }
}

export const maxLength30 = maxLength(30);
