import { Card } from "../ui/card";
import { Button } from "../ui/button"; // Assuming you have a Button component
import { useNavigate } from "react-router-dom"; // or your navigation hook

const PublicErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 text-center">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-destructive">
            Something went wrong
          </h1>
          <p className="text-muted-foreground">
            We're sorry, but an unexpected error has occurred. Please try again
            later.
          </p>
          <div className="pt-4">
            <Button
              onClick={() => navigate(-1)}
              variant="default"
              className="w-full">
              Go Back
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="w-full mt-3">
              Return Home
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PublicErrorPage;
