import React from "react";

const Images = () => {
  const pilotos = [
    { id: 1, imagen: 'LewisHamilton.png' },
        { id: 2, imagen: 'ValtteriBottas.png' },
       { id: 3, imagen: 'MaxVerstappen.png' },
       { id: 4, imagen: 'SergioPerez.png' },
       { id: 5, imagen: 'LandoNorris.png' },
       { id: 6, imagen: 'CharlesLeclerc.png' },
       { id: 7, imagen: 'CarlosSainz.png' },
       { id: 8, imagen: 'DanielRicciardo.png' },
       { id: 9, imagen: 'PierreGasly.png' },
       { id: 10, imagen: 'EstebanOcon.png' },
      { id: 11, imagen: 'FernandoAlonso.png' },
       { id: 12, imagen: 'SebastianVettel.png' },
  ];
   const rutaBaseImagenes = "/images/drivers/";

  return (
    <>
      {pilotos.map((piloto) => (
        <img
          key={piloto.id}
          src={`${rutaBaseImagenes}${piloto.imagen}`}
          alt={`Piloto ${piloto.nombre}`}
        />
      ))}
    </>
  );
};

export default Images;
