interface IErrorMessageProps {
  message: string | undefined;
  messageType: 'error' | 'success' | 'warning';
}

export const AlertMessage = ({ message, messageType }: IErrorMessageProps) => {
  return (
    <p
      data-type={messageType}
      className="w-full text-center font-poppins text-[11px] font-medium tracking-widest data-[type='error']:text-red-500 data-[type='success']:text-green-500 data-[type='warning']:text-orange-500"
    >
      {message}
    </p>
  );
};
