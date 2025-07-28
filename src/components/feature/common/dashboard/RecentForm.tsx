import CLoader from "@/components/shared/CLoader";
import CMessage from "@/components/shared/CMessage";
import { Card } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import {
  deleteFormAction,
  getAllFormDataAction,
} from "@/store/actions/formAction";
import { Edit, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const RecentForm = () => {
  const dispatch = useAppDispatch();
  const {
    allFormData: { data, isError, isLoading, message },
    formDataById: { data: singleData },
  } = useAppSelector((state) => state.form);

  useEffect(() => {
    dispatch(getAllFormDataAction());
  }, [dispatch, singleData]);

  const handleDeleteForm = (id: string) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      dispatch(deleteFormAction(id));
    }
  };

  if (isLoading) {
    return <CLoader />;
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
          className="w-full h-[180px] relative group overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800">
          {/* Card Background (optional) */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 opacity-70" />

          {/* Card Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 z-10">
            <div className="flex-1 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 dark:bg-black/50 transition-opacity duration-300">
                {/* Action Icons */}
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
            </div>

            {/* Bottom Label */}
            <div className="mt-auto pt-2">
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
