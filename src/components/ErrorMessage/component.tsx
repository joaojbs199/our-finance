interface IErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: IErrorMessageProps) => {
  return (
    <p className="mb-2 w-full text-center font-poppins text-[11px] font-normal tracking-widest text-red-500">
      {message}
    </p>
  );
};
