import * as yup from "yup";

const getErrorsFromValidationError = (validationError: yup.ValidationError) => {
  return validationError.inner.reduce(
    (
      errors: {
        [fieldName: string]: string;
      },
      error: yup.ValidationError
    ) => ({
      ...errors,
      [error.path]: error.errors[0]
    }),
    {}
  );
};

export const validateErrors = (
  validationSchema: yup.ObjectSchema<{}> | yup.Lazy,
  values: {}
) => {
  try {
    validationSchema.validateSync(values, { abortEarly: false });
    return {};
  } catch (error) {
    return getErrorsFromValidationError(error);
  }
};

interface ValidateItemsType<T> {
  [key: string]: yup.Schema<T>;
}

export const validateItems = <T, O>(
  items: T[],
  validationObject: ValidateItemsType<O>,
  separator: string = "\n"
): string | null => {
  let errors: string[] = [];
  const schema = yup.object().shape(makeValidationSchema(validationObject));

  try {
    for (const item of items) {
      schema.validateSync(item, { abortEarly: false });
    }
  } catch (validationError) {
    errors = validationError.errors;
  }

  return (errors.length && errors.join(separator)) || null;
};

const makeInObject = <T>(
  schema: yup.ObjectSchemaDefinition<{}>,
  keyArray: string[],
  value: yup.Schema<T>
): yup.ObjectSchemaDefinition<{}> => {
  if (!keyArray || !keyArray.length) {
    return schema;
  }
  const key = keyArray[0];
  keyArray.splice(0, 1);

  if (!keyArray.length) {
    schema[key] = value;
  } else {
    schema[key] = yup.object(
      makeInObject((schema[key] && schema[key].fields) || {}, keyArray, value)
    );
  }
  return schema;
};

const makeValidationSchema = <T>(
  validationObject: ValidateItemsType<T>
): yup.ObjectSchemaDefinition<{}> => {
  let returnSchema: yup.ObjectSchemaDefinition<{}> = {};

  for (const key in validationObject) {
    if (!key) continue;
    returnSchema = makeInObject(
      returnSchema,
      key.split("."),
      validationObject[key]
    );
  }

  return returnSchema;
};
