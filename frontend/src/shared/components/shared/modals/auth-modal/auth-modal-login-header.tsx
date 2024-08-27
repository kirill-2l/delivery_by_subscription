interface Props {

};
export const AuthModalLoginHeader = (props: Props) => {
  return (
    <div className="flex flex-col">
      <div className="font-semibold tracking-tight text-2xl">Login</div>
      <div className="text-sm text-muted-foreground">
        Enter your email below to login to your account
      </div>
    </div>
  );
};
