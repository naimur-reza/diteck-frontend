import { LinkButtonWithIcon } from "@/components/common";

export const Support = () => {
  return (
    <div
      style={{
        backgroundImage: `url("https://demo2.wpopal.com/diteck/wp-content/uploads/2024/12/service-detail_deco.png")`,
        backgroundPosition: "bottom right",
        backgroundRepeat: "no-repeat",
      }}
      className=" shadow-md flex flex-wrap justify-between items-center py-12 xl:py-24  xl:my-24 my-12 rounded-3xl gap-12 xl:gap-24 "
    >
      {/* Help Section */}
      <div className="flex-1  flex justify-center  items-center gap-4 xl:pl-24 ">
        <div className="bg-primary/10 p-4 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 74 74"
            fill="none"
          >
            <g clipPath="url(#clip0_109_2585)">
              <path
                opacity="0.2"
                d="M74.0004 50.0795C74.0004 40.8967 68.7323 32.7013 60.8424 28.7148C60.5974 46.3217 46.3227 60.5964 28.7158 60.8414C32.7023 68.7314 40.8977 73.9994 50.0805 73.9994C54.3859 73.9994 58.5728 72.8528 62.2516 70.6741L73.896 73.895L70.675 62.2506C72.8537 58.5718 74.0004 54.3849 74.0004 50.0795Z"
                fill="#636EDF"
              />
              <path
                d="M56.5117 28.2559C56.5117 12.6753 43.8364 0 28.2559 0C12.6753 0 0 12.6753 0 28.2559C0 33.3337 1.35159 38.2776 3.91815 42.6181L0.103882 56.4073L13.8936 52.5936C18.2341 55.1601 23.1781 56.5117 28.2559 56.5117C43.8364 56.5117 56.5117 43.8364 56.5117 28.2559ZM23.9199 21.6797H19.584C19.584 16.8977 23.4739 13.0078 28.2559 13.0078C33.0378 13.0078 36.9277 16.8977 36.9277 21.6797C36.9277 24.1068 35.9002 26.4396 34.1077 28.0792L30.4238 31.4508V34.832H26.0879V29.5414L31.1804 24.8803C32.0905 24.0475 32.5918 22.911 32.5918 21.6797C32.5918 19.2887 30.6468 17.3438 28.2559 17.3438C25.8649 17.3438 23.9199 19.2887 23.9199 21.6797ZM26.0879 39.168H30.4238V43.5039H26.0879V39.168Z"
                fill="#636EDF"
              />
            </g>
            <defs>
              <clipPath id="clip0_109_2585">
                <rect width="74" height="74" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <h3 className="text-[32px] xl:text-[42px] leading-[50px] font-medium text-gray-900">
          Do you need any help?
        </h3>
      </div>

      {/* Contact Info */}
      <div className="flex-1 flex flex-col items-center text-center">
        <p className="text-sm text-gray-500">support@example.com</p>
        <h3 className="text-[32px] xl:text-[42px] font-medium text-primary">
          + (406) 555-0120
        </h3>
      </div>

      {/* Appointment Button */}
      <div className="flex-1 flex justify-end ">
        <LinkButtonWithIcon
          bgColor="bg-white"
          link="/"
          text="Get An Appointment"
          invertedBorder={false}
          position="center"
          isBorder={false}
          minWidth={220}
        />
      </div>
    </div>
  );
};
