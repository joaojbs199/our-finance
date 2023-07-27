interface IErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: IErrorMessageProps) => {
  return (
    <p className="mb-2 font-poppins text-xs font-normal tracking-wider text-red-500">{message}</p>
  );
};
