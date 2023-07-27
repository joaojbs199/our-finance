import { FieldValues, useForm, Controller } from 'react-hook-form';
import { IFormProps } from './interfaces';
import { TextInput } from '@/src/components/Inputs/TextInput/component';
import { DateInput } from '@/src/components/Inputs/DateInput/component';
import { CurrencyInput } from '@/src/components/Inputs/CurrencyInput/component';
import { StyledSelect } from '@/src/components/BasicSelect/component';

export const Form = <T extends FieldValues>({
  defaultValues,
  handleFormSubmit,
  inputs,
  submitText,
}: IFormProps<T>) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className=" m-auto mt-5 flex w-11/12 max-w-lg flex-wrap justify-center  p-3"
    >
      {inputs.map((input) => {
        if (input.control === 'UNCONTROLLED') {
          if (input.type === 'text') {
            return (
              <TextInput
                key={input.id}
                rules={input.rules}
                error={errors[input.name]}
                name={input.name}
                register={register}
                classNames={input.classNames ?? ''}
              />
            );
          } else if (input.type === 'date') {
            return (
              <DateInput
                key={input.id}
                rules={input.rules}
                name={input.name}
                register={register}
                error={errors[input.name]}
                classNames={input.classNames ?? ''}
              />
            );
          }
        } else if (input.control === 'CONTROLLED') {
          if (input.type === 'currency') {
            return (
              <Controller
                key={input.id}
                control={control}
                name={input.name}
                rules={input.rules}
                render={({ field: { onChange, value } }) => {
                  return (
                    <>
                      <CurrencyInput
                        onChange={onChange}
                        value={value}
                        error={errors[input.name]}
                        classNames={input.classNames ?? ''}
                      />
                    </>
                  );
                }}
              />
            );
          } else if (input.type === 'select') {
            return (
              <Controller
                key={input.id}
                control={control}
                name={input.name}
                rules={{ required: 'Selecione um tipo.' }}
                render={({ field: { onChange, value } }) => {
                  return (
                    <>
                      <StyledSelect
                        error={errors[input.name]}
                        value={value}
                        onChange={onChange}
                        options={input.options}
                      />
                    </>
                  );
                }}
              />
            );
          }
        }
      })}
      <button
        className="duration-250 mb-5 mt-8 flex h-9 w-full max-w-[200px] items-center justify-center rounded-md border border-neutral-700 text-gray-100 transition-all hover:bg-orange-500 hover:text-neutral-800"
        type="submit"
      >
        {submitText}
      </button>
    </form>
  );
};
