import CMessage from "@/components/shared/CMessage";
import { Card } from "@/components/ui/card";
import { LoaderOne } from "@/components/ui/loader";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { deleteFormAction } from "@/store/actions/formAction";
import { Edit, FileText, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const RecentForm = () => {
  const dispatch = useAppDispatch();
  const {
    formsData: { data, isError, isLoading, message },
  } = useAppSelector((state) => state.form);
  const { user } = useAppSelector((state) => state.user);

  const handleDeleteForm = (id: number) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      if (user?.email) {
        dispatch(deleteFormAction({ email: user.email, id }));
      }
    }
  };

  if (data.length === 0 && isLoading) {
    return <LoaderOne />;
  }

  if (isError) {
    return (
      <CMessage variant="error" message={message || "Failed to load forms"} />
    );
  }

  if (data.length === 0) {
    return <CMessage variant="error" message="No recent forms" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {data.map((item) => (
        <Card
          key={item.id}
          className="w-full h-[180px] relative group overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 rounded-lg">
          {/* Card Background with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 to-purple-50/70 dark:from-gray-700/80 dark:to-gray-900/80" />

          {/* Document Icon Container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="
      w-16 h-16 
      flex items-center justify-center 
      text-blue-500 dark:text-blue-400
      bg-white/50 dark:bg-gray-700/50 
      rounded-full
      group-hover:opacity-0 
      transition-opacity duration-300
    ">
              <FileText className="w-8 h-8" />{" "}
              {/* Using FileText as docs icon */}
            </div>
          </div>

          {/* Card Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 z-10">
            {/* Overlay with action buttons */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 dark:bg-black/50 transition-opacity duration-300 backdrop-blur-sm">
              <div className="flex gap-4">
                <Link
                  to={`/create-form/${item.id}`}
                  target="_blank"
                  className="
            p-3 rounded-full 
            bg-white/90 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600
            transition-all duration-200 
            transform hover:scale-110
            shadow-md hover:shadow-lg
            border border-transparent hover:border-blue-200 dark:hover:border-gray-500
            group/icon cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          "
                  aria-label={`Edit ${item.title}`}>
                  <Edit
                    className="
              w-5 h-5 text-blue-600 dark:text-blue-400
              group-hover/icon:text-blue-700 dark:group-hover/icon:text-blue-300
              transition-colors duration-200
            "
                  />
                </Link>

                <button
                  onClick={() => handleDeleteForm(item.id)}
                  className="
            p-3 rounded-full 
            bg-white/90 hover:bg-red-100 dark:bg-gray-700 dark:hover:bg-gray-600
            transition-all duration-200 
            transform hover:scale-110
            shadow-md hover:shadow-lg
            border border-transparent hover:border-red-200 dark:hover:border-gray-500
            group/icon cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
          "
                  aria-label={`Delete ${item.title}`}>
                  <Trash2
                    className="
              w-5 h-5 text-red-600 dark:text-red-400
              group-hover/icon:text-red-700 dark:group-hover/icon:text-red-300
              transition-colors duration-200
            "
                  />
                </button>
              </div>
            </div>

            {/* Bottom Label with better styling */}
            <div className="mt-auto pt-2 bg-white/80 dark:bg-gray-900/80 rounded-lg p-2 backdrop-blur-sm">
              <p className="text-gray-800 dark:text-white text-sm font-medium truncate text-center">
                {item.title}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RecentForm;
