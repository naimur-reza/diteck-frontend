export const ServiceTitleAndDescription = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <h1 className="text-[42px] md:text-[42px] xl:text-[60px] leading-[50px] md:leading-[70px] font-medium">
        {title ? title : ""}
      </h1>
      <p className="text-xl text-[#484848] leading-[35px] mt-[10px]">
        {description ? description : ""}
      </p>
    </div>
  );
};
