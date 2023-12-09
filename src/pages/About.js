import React from "react";
import Slider from "react-slick";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000,
  cssEase: "linear",
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
};
const blogs = [
  {
    imgUrl:
      "https://images.unsplash.com/photo-1682687220198-88e9bdea9931?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8bmF0dXJlfGVufDB8fDB8fHww",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fDB8fHww",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8fDB8fHww",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
  },
];
const About = () => {
  return (
    <div className="container mx-auto pb-6">
      <Slider {...settings} className=" mt-5 mb-10 flex items-stretch ">
        {blogs.map((blog) => {
          return (
            <>
              <div className="h-96 relative overflow-hidden">
                <img
                  className="h-full w-full object-cover rounded-lg"
                  src={blog.imgUrl}
                  alt={blog.title}
                />
                <div className="overlay group-hover:flex hidden duration-300 absolute w-full h-full top-0 left-0"></div>
              </div>
              <div className="mt-2 px-3">
                {/* <Category cat={blog.category} /> */}
                <h3 className="font-semibold">{blog.title}</h3>
                <span className="text-sm text-gray-300">{blog.author}</span>
              </div>
            </>
          );
        })}
      </Slider>
      <div className="py-2 b mt-4 border-black">
        <h3 className=" text-3xl font-semibold ">About Us</h3>
        <p className="text-zinc-500 text-sm">Who We Are</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <p className="col-span-2">
          {" "}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe
          dignissimos neque officiis voluptatem facilis. Fugit dignissimos modi
          earum, vel deleniti accusantium facere deserunt, excepturi corrupti at
          provident! Accusantium consequatur dolores quaerat cum maiores, nulla,
          laudantium sequi sunt consequuntur in ab adipisci, porro eveniet
          incidunt! Deleniti quasi id repellendus impedit quia odit rem aliquam
          omnis quaerat! Asperiores nulla ipsum, accusamus ea a velit excepturi
          magni quis, explicabo consequuntur, quae iste. Delectus tenetur
          officia nemo illum cum voluptatem explicabo officiis voluptate. Amet,
          numquam. Assumenda ullam corporis cumque, hic sit, qui dolorem
          voluptatibus vel, at quibusdam deserunt quae? Aliquam repellendus
          perferendis cum facere cupiditate nostrum quibusdam sunt consequuntur
          aspernatur obcaecati? Ipsam alias odit eos nihil quod aut
          consequuntur? Saepe in quod vero tenetur deleniti illo culpa et
          doloremque consequuntur, harum velit? Officiis aliquam quos
          consequuntur nam placeat non, voluptatem quas totam fuga perspiciatis
          possimus ab quibusdam culpa dolore soluta, reiciendis sapiente
          corporis quo ea. Earum sequi sed saepe, qui consequatur corrupti
          neque, similique temporibus cum veritatis molestiae eaque quasi nisi
          eius rerum eligendi fugit doloremque impedit atque amet ducimus fuga
          unde. Voluptatibus eligendi iure officia assumenda facilis. Sequi
          fugiat laudantium dolores sapiente nihil atque omnis dolor numquam,
          nisi veritatis accusantium consectetur itaque. Maiores animi vel
          aperiam sit dolorem voluptatibus? Aspernatur maxime nesciunt iusto
          molestias excepturi velit tempora voluptas dolorum vel adipisci dolor
          at, molestiae amet, porro, repellendus hic commodi voluptate sapiente
          similique autem nulla nihil odit. Molestias qui quasi dolor facere
          recusandae enim cumque. Sed rerum laborum animi magnam ab molestiae
          iure cupiditate nesciunt. Atque aut aliquam molestias ipsam culpa cum
          vitae exercitationem? Aspernatur, dolore ullam incidunt, voluptatibus
          nobis quidem dolorem nesciunt dignissimos tempora iusto in soluta.
        </p>
        <div className="col-span-1 ">
          <div className="flex flex-col gap-3 items-center">
            <div className="flex items-center w-full justify-between text-white px-4 rounded-lg py-2 bg-blue-800">
              <p>
                Facebook
                <span>5.3K</span>
              </p>
              <FaFacebook />
            </div>
            <div className="flex items-center w-full justify-between text-white px-4 rounded-lg py-2 bg-sky-500">
              <p>
                Twitter
                <span>63K</span>
              </p>
              <FaTwitter />
            </div>
            <div className="flex items-center w-full justify-between text-white px-4 rounded-lg py-2 bg-blue-900">
              <p>
                Instagram
                <span>1M</span>
              </p>
              <FaInstagram />
            </div>
            <div className="flex items-center w-full justify-between text-white px-4 rounded-lg py-2 bg-red-500">
              <p>
                YouTube
                <span>2M</span>
              </p>
              <FaYoutube />
            </div>
          </div>
          <div className="grid mt-6 grid-cols-2 gap-3">
            {blogs.map((b, i) => (
              <div className="h-28" key={i}>
                <img className="h-full w-full" src={b.imgUrl} alt="imagem" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
