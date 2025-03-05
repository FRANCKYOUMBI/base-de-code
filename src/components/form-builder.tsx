'use client';

import React from "react";
import {
  Controller,
  SubmitHandler,
  FieldErrors,
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  FieldValues,
  DefaultValues,
  UseFormProps,
  UseFormWatch,
  useFieldArray,
  Path,
  FieldArray,
  PathValue,
} from "react-hook-form";
import { ZodSchema } from "zod";
import {
  Button,
  Input,
  Text,
  Title,
  Select,
  Checkbox,
  Radio,
  Textarea,
  type SelectOption,
} from "rizzui";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";

import { Form } from "./form";
import QuillEditor from "@/utils/quill-editor";
import Rate, { rateClasses } from "@/utils/rate";
import cn from "@/ui/class-names";
import UploadZone from "@/utils/file-upload/upload-zone";

type BaseField = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  description?: string;
  tooltips?: string[];
  dependsOn?: {
    field: string;
    value: any;
    operator?: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
  };
};

type TextField = BaseField & {
  type: "text" | "password" | "email";
  maxLength?: number;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
};

type TextFieldNumber = BaseField & {
  type: "number";
  min?: number;
  max?: number;
};

type TextAreaField = BaseField & {
  type: "textarea";
  rows?: number;
};

type UploadField = BaseField & {
  type: "upload";
  accept?: string | string[];
  maxSize?: number;
};

type QuillField = BaseField & {
  type: "quill";
  minHeight?: string;
  toolbarOptions?: string[];
};

type DateField = BaseField & {
  type: "date";
  format?: string;
  minDate?: Date;
};

type Option = {
  label: string;
  value: string | number;
};

type CustomSelectOption = SelectOption & {
  checkerValue?: string | number | boolean;
};

type SelectField = BaseField & {
  type: "select";
  options: CustomSelectOption[];
  isMulti?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  onChange?: (value: any, setValue: UseFormSetValue<any>) => void;
};

type CheckboxField = BaseField & {
  type: "checkbox";
  options?: Option[]; // Si présent, crée un groupe de checkbox
  onChange?: (value: any, setValue: UseFormSetValue<any>) => void;
  checked?: boolean;
};

type RadioField = BaseField & {
  type: "radio";
  options: Option[];
  orientation?: "horizontal" | "vertical";
  onChange?: (value: any) => void;
  show?: (values: any) => boolean;
  defaultValue?: string | number | boolean;
};

export type RepeaterField = BaseField & {
  type: "repeater";
  fields: Field[];
  minItems?: number;
  maxItems?: number;
  addButtonText?: string;
  removeButtonText?: string;
  noAddButton?: boolean;
};

type RateField = BaseField & {
  type: "rate";
  max?: number; // Nombre maximum d'étoiles
  allowHalf?: boolean; // Permettre des demi-étoiles
  character?: React.ReactNode | Array<React.ReactNode>; // Personnalisation des caractères
  tooltips?: string[]; // Infobulles pour chaque étoile
  size?: keyof typeof rateClasses.size; // Taille des étoiles
};

export type Field =
  | TextField
  | TextFieldNumber
  | DateField
  | TextAreaField
  | UploadField
  | QuillField
  | SelectField
  | CheckboxField
  | RadioField
  | RepeaterField
  | RateField;

export type FieldGroup = {
  title: string;
  description: string;
  fields: Array<Field>;
};

type FormBuilderProps<T extends FieldValues> = {
  fields: Array<Field | FieldGroup>;
  validationSchema: ZodSchema<T>;
  defaultValues: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
  submitButtonLabel: string;
  className?: string;
  isLoading?: boolean;
  isModalView?: boolean;
  onCancel?: () => void;
  cancelButtonLabel?: string;
  formOptions?: Omit<UseFormProps<T>, "defaultValues">;
};

const HorizontalFormBlockWrapper: React.FC<React.PropsWithChildren<{
  title: string;
  description?: string;
  className?: string;
  isModalView?: boolean;
}>> = ({
  title,
  description,
  children,
  className,
  isModalView = true,
}) => (
    <div className={cn(className, isModalView ? '@5xl:grid @5xl:grid-cols-6' : '')}>
      {isModalView && (
        <div className="col-span-2 mb-6 pe-4 @5xl:mb-0">
          <Title as="h6" className="font-semibold">
            {title}
          </Title>
          {description && (
            <Text className="mt-1 text-sm text-gray-500">{description}</Text>
          )}
        </div>
      )}
      <div className={cn(
        'grid grid-cols-2 gap-3 @lg:gap-4 @2xl:gap-5',
        isModalView ? 'col-span-4' : ''
      )}>
        {children}
      </div>
    </div>
  );

// Helper type guard
const isFieldGroup = (field: Field | FieldGroup): field is FieldGroup =>
  "fields" in field;

// Composant pour le rendu des champs répétables
const RepeaterFieldset = <T extends FieldValues>({
  field,
  register,
  control,
  getValues,
  setValue,
  errors,
  watch,
  nestIndex,
  fieldArrayName,
}: {
  field: RepeaterField;
  register: UseFormRegister<T>;
  control: Control<T>;
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
  errors: FieldErrors<T>;
  watch: UseFormWatch<T>;
  nestIndex?: number;
  fieldArrayName: string;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldArrayName as any,
  });

  return (
    <div className="space-y-4">
      <div className={"grid grid-cols-2 gap-3 @lg:gap-4 @2xl:gap-5"}>
        {fields.map((item, index) => (
          <div key={item.id} className="relative border rounded-lg p-4">
            <div className="absolute right-4 top-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {field.fields.map((subField) => (
                <div key={subField.name} className={subField.className}>
                  <FieldRenderer
                    field={{
                      ...subField,
                      name: `${fieldArrayName}.${index}.${subField.name}`,
                    }}
                    register={register}
                    control={control}
                    getValues={getValues}
                    setValue={setValue}
                    errors={errors}
                    watch={watch}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>


      {errors[fieldArrayName] && (
        <Text className="text-red-500">
          {(errors[fieldArrayName]?.message ?? "") as String}
        </Text>
      )}
    
    {  !field.noAddButton && <Button
        type="button"
        variant="outline"
        onClick={() => append({} as FieldArray<T>)}
        disabled={field.maxItems ? fields.length >= field.maxItems : false}
        className={`w-full ${errors[fieldArrayName]?.message ? "border-red text-red" : ""}`}
      >
        <Plus className="w-4 h-4 mr-2" />
        {field.addButtonText || "Ajouter un élément"}
      </Button>}
    </div>
  );
};

const renderDisplayValue = (value: CustomSelectOption) => {
  return (
    <span className="flex items-center gap-2">
      {value.avatar && <img
        crossOrigin='anonymous'
        src={value.avatar}
        alt={value.label}
        className="w-7 h-7 object-cover rounded-full"
      />}
      <Text>{value.label}</Text>
    </span>
  )
}

const renderOptionDisplayValue = (option: CustomSelectOption, selectedOption: any) => {
  return (
    <div className={`flex items-center gap-3`}>
      {option.avatar && <img
        crossOrigin='anonymous'
        src={option.avatar}
        alt={option.label}
        className="w-9 h-9 object-cover rounded"
      />}
      <div className={`flex gap-2 ${selectedOption?.value === option.value ? 'text-primary' : ''}`}>
        <Text fontWeight="medium">{option.label}</Text>
        {/*green check */}
        {selectedOption?.value === option.value ? <span className="text-primary">✓</span> : null}
        {/*<Text>{option.value}</Text>*/}
      </div>
    </div>
  )
}

// Composant FieldRenderer mis à jour
const FieldRenderer = <T extends FieldValues>({
  field,
  register,
  control,
  getValues,
  setValue,
  errors,
  watch,
  nestIndex,
}: {
  field: Field;
  register: UseFormRegister<T>;
  control: Control<T>;
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
  errors: FieldErrors<T>;
  watch: UseFormWatch<T>;
  nestIndex?: number;
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  // Gestion de la dépendance
  if (field.dependsOn) {
    const dependOnFieldParent = field.dependsOn.field.split(".")[0];
    let pathFromParent = "";
    if (field.name.split(".").length > 1) {
      const splitted = field.name.split(".");
      splitted.pop();
      pathFromParent = splitted.join(".") + ".";
    }
    let watchedValue = watch(`${pathFromParent}${dependOnFieldParent}` as any);
    if (watchedValue !== undefined) {
      if (field.dependsOn.field.split(".").length > 1) {
        watchedValue =
          watchedValue[field.dependsOn.field.split(".")[1] as Path<T>];
      } else if (typeof watchedValue === "object") {
        watchedValue = watchedValue["value" as Path<T>];
      }
    }
    const shouldShow = (() => {
      switch (field.dependsOn.operator) {
        case "equals":
          return watchedValue === field.dependsOn.value;
        case "notEquals":
          return watchedValue !== field.dependsOn.value;
        case "contains":
          return (
            Array.isArray(watchedValue) &&
            watchedValue?.includes(field.dependsOn.value)
          );
        case "greaterThan":
          return watchedValue > field.dependsOn.value;
        case "lessThan":
          return watchedValue < field.dependsOn.value;
        default:
          return watchedValue === field.dependsOn.value;
      }
    })();

    if (!shouldShow) return null;
  }

  const getError = (fieldName: string): any => {
    // if is subitems like this productUnits.0.price
    if (fieldName.includes(".")) {
      const [field, index, subField] = fieldName.split(".");
      // @ts-ignore
      return errors?.[field]?.[index]?.[subField] ?? "";
    } else {
      return errors[fieldName];
    }
  };

  const commonProps = {
    label: field.label,
    placeholder: field.placeholder,
    disabled: field.disabled,
    className: cn(
      field.className,
      "[&::placeholder]:!text-gray-500 dark:[&::placeholder]:!text-white [&>input::placeholder]:!text-gray-500 dark:[&>input::placeholder]:!text-white",
    ),
    error: getError(field.name)?.message as string,
    description: field.description,
  };

  switch (field.type) {
    case "text":
      return (
        <Input
          {...commonProps}
          {...register(field.name as Path<T>)}
          maxLength={field.maxLength}
          type={field.type}
        />
      );
    case "email":
      return (
        <Input
          {...commonProps}
          {...register(field.name as Path<T>)}
          maxLength={field.maxLength}
          type="email"
          autoComplete="email"
        />
      );
    case "password":
      return (
        <Input
          {...commonProps}
          {...register(field.name as Path<T>)}
          maxLength={field.maxLength}
          //@ts-ignore
          type={showPassword ? "text" : "password"}
          suffix={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-green-800 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          }
        />
      );

    case "number":
      return (
        <Input
          {...commonProps}
          {...register(field.name as Path<T>, { valueAsNumber: true })}
          type="number"
          min={field.min}
          max={field.max}
        />
      );
    case "date":
      return (
        <Input
          {...commonProps}
          {...register(field.name as Path<T>)}
          type="date"
          min={field.minDate?.toISOString().split("T")[0]}
        />
      );
    case "upload":
      return (
        <UploadZone
          name={field.name}
          getValues={getValues}
          setValue={setValue}
          accept={field.accept}
          maxSize={field.maxSize}
          {...commonProps}
          className={cn("col-span-full", commonProps.className)}
        />
      );

    case "textarea":
      return (
        <Textarea
          {...commonProps}
          {...register(field.name as Path<T>)}
          rows={field.rows || 4}
        />
      );
    case "quill":
      return (
        <Controller
          name={field.name as Path<T>}
          control={control}
          render={({ field: { onChange, value } }) => (
            <QuillEditor
              value={value}
              onChange={onChange}
              {...commonProps}
              className={cn(
                "[&>.ql-container_.ql-editor]:min-h-[100px]",
                "[&_.ql-editor.ql-blank::before]:!text-gray-500",
                "dark:[&_.ql-editor.ql-blank::before]:!text-gray-200",
                field.minHeight &&
                `[&>.ql-container_.ql-editor]:min-h-[${field.minHeight}]`,
                commonProps.className
              )}
              toolbarOptions={field.toolbarOptions}
            />
          )}
        />
      );
    case "select":
      return (
        <Controller
          name={field.name as Path<T>}
          control={control}
          render={({ field: { onChange, value } }) => {
            // Gérer les deux cas : isMulti activé ou désactivé
            const availableOptions = field.options?.filter((option) => {
              if (field.isMulti) {
                // Cas où isMulti est activé : value est un tableau
                return !value?.some(
                  (selected: CustomSelectOption) => selected.value === option.value
                );
              } else {
                // Cas où isMulti est désactivé : value est un objet unique
                return !value || value.value !== option.value;
              }
            }) ?? [];
            return (
              <Select
                {...commonProps}
                key={availableOptions.map((option) => option.value).join(",")}
                options={availableOptions}
                multiple={field.isMulti}
                clearable={field.isClearable}
                onClear={() => {
                  onChange(null);
                  field.onChange?.(null, setValue);
                }}
                searchPlaceHolder={"Recercher..."}
                searchable={field.isSearchable}
                displayValue={(selectedValue: CustomSelectOption) => {
                  if (field.isMulti) {
                    // Cas où isMulti est activé : afficher les éléments sélectionnés avec un bouton de suppression
                    return (
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(selectedValue) &&
                          selectedValue.map((option, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1"
                            >
                              {option.avatar && (
                                <img
                                  crossOrigin="anonymous"
                                  src={option.avatar}
                                  alt={option.label}
                                  className="w-7 h-7 object-cover rounded-full"
                                />
                              )}
                              <Text>{option.label}</Text>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation(); // Empêcher la fermeture du Select
                                  const newValue = selectedValue.filter(
                                    (_, i) => i !== index
                                  );
                                  onChange(newValue);
                                }}
                                className="text-red-500 hover:text-red-700"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                      </div>
                    );
                  } else {
                    // Cas où isMulti est désactivé : afficher un seul élément avec avatar et texte
                    return (
                      <span className="flex items-center gap-2">
                        {selectedValue?.avatar && (
                          <img
                            crossOrigin="anonymous"
                            src={selectedValue.avatar}
                            alt={selectedValue.label}
                            className="w-7 h-7 object-cover rounded-full"
                          />
                        )}
                        <Text>{selectedValue?.label}</Text>
                      </span>
                    );
                  }
                }}
                getOptionDisplayValue={(option) =>
                  renderOptionDisplayValue(option, value)
                }
                onChange={(value) => {
                  onChange(value);
                  field.onChange?.(value, setValue);
                }}
                value={value ?? null}
              />
            )
          }}
        />
      );

    case "checkbox":
      return field.options ? (
        <div className="space-y-2">
          <Text className="block text-sm font-medium text-gray-700">
            {field.label}
          </Text>
          <div className="space-y-2">
            {field.options.map((option) => (
              <Checkbox
                key={option.value}
                label={option.label}
                {...register(`${field.name}.${option.value}` as Path<T>)}
              />
            ))}
          </div>
          {commonProps.error && (
            <Text className="mt-1 text-sm text-red-500">
              {commonProps.error}
            </Text>
          )}
        </div>
      ) : (
        <Checkbox {...commonProps} {...register(field.name as Path<T>)} />
      );

    case "radio":
      if (field.type === "radio" && field.show && !field.show(watch())) {
        return null;
      }

      return (
        <Controller
          name={field.name as Path<T>}
          control={control}
          defaultValue={field.defaultValue as PathValue<T, Path<T>>}
          render={({ field: { onChange, value } }) => {
            // Convertir la valeur en chaîne pour une comparaison cohérente
            const currentValue = String(value);

            return (
              <div className="space-y-2">
                <Text className="block text-sm font-medium text-gray-700">
                  {field.label}
                </Text>
                <div className={cn(
                  "space-y-2",
                  field.orientation === "horizontal" && "flex space-x-6 space-y-0"
                )}>
                  {field.options.map((option) => {
                    // Convertir également la valeur de l'option en chaîne
                    const isChecked = currentValue === String(option.value);
                    return (
                      <Radio
                        key={option.value}
                        label={option.label}
                        value={option.value}
                        checked={isChecked}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          // Mettre à jour la valeur
                          onChange(newValue);
                          if (field.type === "radio" && field.onChange) {
                            field.onChange(newValue);
                          }
                        }}
                      />
                    );
                  })}
                </div>
                {commonProps.error && (
                  <Text className="mt-1 text-sm text-red-500">
                    {commonProps.error}
                  </Text>
                )}
              </div>
            );
          }}
        />
      );

    case "repeater":
      return (
        <div className={field.className}>
          <RepeaterFieldset
            field={field}
            register={register}
            control={control}
            getValues={getValues}
            setValue={setValue}
            errors={errors}
            watch={watch}
            nestIndex={nestIndex}
            fieldArrayName={field.name}
          />
        </div>
      );

    case "rate":
      return (
        <Controller
          name={field.name as Path<T>}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Rate
              {...commonProps}
              value={value}
              onChange={onChange}
              allowHalf={field.allowHalf || false}
              character={field.character}
              tooltips={field.tooltips}
              size={field.size || "md"}
            />
          )}
        />
      );

    // ... autres cas existants ...
    default:
      return null;
  }
};

function FormBuilder<T extends FieldValues>({
  fields,
  validationSchema,
  defaultValues,
  onSubmit,
  className,
  isLoading,
  isModalView = true,
  submitButtonLabel,
  onCancel,
  cancelButtonLabel,
  formOptions,
}: FormBuilderProps<T>) {
  // Inclure defaultValues dans les props de useForm
  const formProps: UseFormProps<T> = {
    mode: "onChange",
    defaultValues,
    ...formOptions,
  };

  return (
    <Form<T>
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      useFormProps={formProps}
      className={cn(
        "isomorphic-form flex flex-grow flex-col @container",
        "[&::-webkit-scrollbar]:w-2",
        "[&::-webkit-scrollbar-track]:bg-transparent",
        "[&::-webkit-scrollbar-thumb]:bg-gray-200",
        "dark:[&::-webkit-scrollbar-thumb]:bg-gray-100",
        "scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-100",
        className
      )}
    >
      {({
        register,
        control,
        getValues,
        setValue,
        watch,
        reset, // Ajout de reset pour gérer defaultValues dynamiquement
        formState: { errors },
      }) => {


        return (
          <>
            <div className="flex-grow pb-10">
              <div
                className={cn(
                  "grid grid-cols-1",
                  isModalView
                    ? "gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12 [&>div]:pt-7 first:[&>div]:pt-0 @2xl:[&>div]:pt-9 @3xl:[&>div]:pt-11"
                    : "gap-5"
                )}
              >
                {fields.map((field, index) => (
                  <React.Fragment
                    key={isFieldGroup(field) ? field.title : field.name}
                  >
                    {isFieldGroup(field) ? (
                      <HorizontalFormBlockWrapper
                        title={field.title}
                        description={field.description}
                        isModalView={isModalView}
                      >
                        {field.fields.map((subField) => (
                          <FieldRenderer
                            key={subField.name}
                            field={subField}
                            register={register}
                            control={control}
                            getValues={getValues}
                            setValue={setValue}
                            errors={errors}
                            watch={watch}
                          />
                        ))}
                      </HorizontalFormBlockWrapper>
                    ) : (
                      <div className="col-span-2">
                        <FieldRenderer
                          field={field}
                          register={register}
                          control={control}
                          getValues={getValues}
                          setValue={setValue}
                          errors={errors}
                          watch={watch}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div
              className={cn(
                "sticky bottom-0 z-40 flex items-center justify-end gap-3 bg-gray-0/10 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col",
                isModalView ? "-mx-10 -mb-7 px-10 py-5" : "py-1"
              )}
            >
              {onCancel && cancelButtonLabel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="w-full @xl:w-auto"
                >
                  {cancelButtonLabel}
                </Button>
              )}
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full @xl:w-auto"
              >
                {submitButtonLabel}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}


export default FormBuilder;