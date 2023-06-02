function Form({ children, ...props }: React.DOMAttributes<HTMLFormElement>) {
  return (
    <form className="grid gap-8" {...props}>
      {children}
    </form>
  );
}

export default Form;
