const Footer = () => {
  return (
    <>
      <footer className="py-6  md:px-8 md:py-0 bg-black text-white border-t border-gray-800">
        <div className="flex flex-col items-center md:flex-row justify-between gap-4 md:h-24">
          <p className="text-balance text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href=""
              target="_blank"
              className="font-medium underline underline-offset-4"
            >
              Vipul Maheshwari
            </a>
            , You can contact me on{" "}
            <a
              href=""
              target="_blank"
              className="font-medium underline underline-offset-4"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
