import { ParallaxBanner, SectionTitle } from "@/components/common";

const Contact = () => {
  return (
    <div className="container">
      <ParallaxBanner
        img={
          "https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/blog_bc.jpg"
        }
        title="Contact Us"
        pageTitle="Contact"
      />

      <div className="mt-10">
        <SectionTitle
          title="We're ready to help you!"
          buttonText="Get in touch"
        />

        <div className="md:grid grid-cols-5 py-10">
          <div className="col-span-2"></div>
          <div className="grid grid-cols-2 gap-4 col-span-3">
            <input
              className={inputStyle + "bg-white"}
              type="text"
              placeholder="Name"
            />
            <input
              className={inputStyle + "bg-white"}
              type="text"
              placeholder="Email"
            />
            <input
              className={`${inputStyle} bg-white col-span-2`}
              type="text"
              placeholder="Subject"
            />
            <textarea
              className={`${inputStyle} bg-white col-span-2`}
              placeholder="Message"
            />
            <input
              className={`${inputStyle} bg-primary col-span-2 hover:bg-primary/90 transition-colors cursor-pointer text-white`}
              type="submit"
              value="Submit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

const inputStyle = "rounded  px-4 py-3 rounded-2xl focus:outline-none w-full  ";
