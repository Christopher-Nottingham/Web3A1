

// ############################################################
// # @authour Christopher Nottingham                          #
// # An api for searching a Art database                      #
// ############################################################
const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express();
const supaUrl = 'https://xuaelmufymdrenjoedzq.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1YWVsbXVmeW1kcmVuam9lZHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxMTg3NjUsImV4cCI6MjA1NTY5NDc2NX0.MO_9Z34HESm-62hjZhUrNP3PDr2SE5G0yaTmzVfeShI';
const supabase = supa.createClient(supaUrl, supaAnonKey);



// ############################################################
// # Routes for returning all the data in a database          #
// ############################################################


//Returns all the gallaries 
app.get('/api/galleries', async (req, res) => {
  const { data, error } = await supabase
    .from('Galleries')
    .select();
  res.send(data);
});
//Return all genres
app.get('/api/genres', async (req, res) => {
  const { data, error } = await supabase
    .from('Genres')
    .select("genreId,genreName,description,wikiLink, Eras(eraName,eraYears)");
  res.send(data);
}
);
//Returns all the eras in the database
app.get('/api/eras', async (req, res) => {
  const { data, error } = await supabase
    .from('Eras')
    .select();
  res.send(data);
});
//Returns all artists
app.get('/api/artists', async (req, res) => {
  const { data, error } = await supabase
    .from('Artists')
    .select();
  res.send(data);
});

//Return all paintings without the FK's
app.get('/api/paintings', async (req, res) => {
  const { data, error } = await supabase
    .from('Paintings')
    .select("paintingId,imageFileName,title,shapeId,museumLink,accessionNumber,copyrightText,description,excerpt,yearOfWork,width,height,medium,cost,MSRP,googleLink,googleDescription,wikiLink,jsonAnnotations, Artists!inner(firstName, lastName, nationality, yearOfBirth, yearOfDeath, details, artistLink), Galleries!inner(galleryName,galleryNativeName,galleryCity,galleryAddress,galleryCountry,latitude,longitude,galleryWebSite,flickrPlaceId,yahooWoeId,googlePlaceId)")
    .order("title", { ascending: true });
  res.send(data);
}
);


// ############################################################
// # Routes for returning specific data in a database          # 2
// ############################################################

// Returns all data for specific gallery
app.get('/api/galleries/:ref', async (req, res, next) => {

  const { data, error } = await supabase
    .from('Galleries')
    .select()
    .eq('galleryId', req.params.ref);

  if (data.length == 0) {
    res.send({ "Error": `No galleries exist with ${req.params.ref} ...please try another gallery` });
  }
  else {
    res.send(data);
  }
});

// Returns all data for specific artist
app.get('/api/artists/:ref', async (req, res) => {
  const { data, error } = await supabase
    .from('Artists')
    .select()
    .eq('artistId', req.params.ref);

  if (data.length == 0) {
    res.send({ "Error": `No artists exist with ${req.params.ref} ...please try another artist` });
  }
  else {
    res.send(data);
  }

});

// Returns all data for specific painting
app.get('/api/paintings/:ref', async (req, res) => {

  const { data, error } = await supabase
    .from('Paintings')
    .select("paintingId,imageFileName,title,shapeId,museumLink,accessionNumber,copyrightText,description,excerpt,yearOfWork,width,height,medium,cost,MSRP,googleLink,googleDescription,wikiLink,jsonAnnotations, Artists!inner(firstName, lastName, nationality, yearOfBirth, yearOfDeath, details, artistLink), Galleries!inner(galleryName,galleryNativeName,galleryCity,galleryAddress,galleryCountry,latitude,longitude,galleryWebSite,flickrPlaceId,yahooWoeId,googlePlaceId)")
    .eq('paintingId', req.params.ref);

  if (data.length == 0) {
    res.send({ "Error": `No paintings exist with ${req.params.ref} ...please try another painting` });
  }
  else {
    res.send(data);

  }

});

// Returns all data for specific genre
app.get('/api/genres/:ref', async (req, res) => {
  const { data, error } = await supabase
    .from('Genres')
    .select("genreId,genreName,description,wikiLink, Eras(eraName,eraYears)")
    .eq('genreId', req.params.ref);
  if (data.length == 0) {
    res.send({ "Error": `No genres exist with ${req.params.ref} ...please try another genres` });
  }
  else {
    res.send(data);

  }
}
);



// ############################################################
// # Routes for searching based on a country                   # 3
// ############################################################

// Returns all artists from a country that begin with the words in the parameter
app.get('/api/artists/country/:substring', async (req, res) => {
  const { data, error } = await supabase
    .from('Artists')
    .select()
    .ilike('nationality', req.params.substring + '%');
  if (data.length == 0) {
    res.send({ "Error": `No artist are from countries with ${req.params.substring} at the start of the country name...please try another country name` });
  }
  else {
    res.send(data);

  }
}
);

// Returns all galleries that are in a specific country that match the parameter
app.get('/api/galleries/country/:substring', async (req, res) => {
  const { data, error } = await supabase
    .from('Galleries')
    .select()
    .ilike('galleryCountry', req.params.substring + '%');
  if (data.length == 0) {
    res.send({ "Error": `No galleries were found in the country substring ${req.params.substring} ...please try another country..ie. Netherlands, Canada, etc. The following api uses offical country names so Holland will not work` });
  }
  else {
    res.send(data);
  }

});

//Returns all the paintings by artists whose nationality begins with the provided substring
app.get('/api/paintings/artists/country/:ref', async (req, res) => {

  const { data, error } = await supabase

    .from('Paintings')
    .select("paintingId,imageFileName,title,shapeId,museumLink,accessionNumber,copyrightText,description,excerpt,yearOfWork,width,height,medium,cost,MSRP,googleLink,googleDescription,wikiLink,jsonAnnotations, Artists!inner(firstName, lastName, nationality, yearOfBirth, yearOfDeath, details, artistLink), Galleries!inner(galleryName,galleryNativeName,galleryCity,galleryAddress,galleryCountry,latitude,longitude,galleryWebSite,flickrPlaceId,yahooWoeId,googlePlaceId)")
    .order("title", { ascending: true })
    .ilike('Artists.nationality', req.params.ref + "%");

  res.send(data);
}
  // }
);

//Returns the paintings whose title contains the provided substring
app.get('/api/paintings/search/:substring', async (req, res) => {
  const { data, error } = await supabase
    .from('Paintings')
    .select("paintingId,imageFileName,title,shapeId,museumLink,accessionNumber,copyrightText,description,excerpt,yearOfWork,width,height,medium,cost,MSRP,googleLink,googleDescription,wikiLink,jsonAnnotations, Artists!inner(firstName, lastName, nationality, yearOfBirth, yearOfDeath, details, artistLink), Galleries!inner(galleryName,galleryNativeName,galleryCity,galleryAddress,galleryCountry,latitude,longitude,galleryWebSite,flickrPlaceId,yahooWoeId,googlePlaceId)")
    .ilike('title', '%' + req.params.substring + '%')
    .order("title", { ascending: true });
  if (data.length == 0) {
    res.send({ "Error": `No paintings were found with the following title substring ${req.params.substring} ...please try another substring` });
  } else {
    res.send(data);
  }
}
);

// ############################################################
// # Routes for returning specific sorting data in a database # 
// ############################################################

// Returns all the paintings, sorted by either title or yearOfWork
app.get('/api/paintings/sort/:sortType', async (req, res) => {

  const sortType = req.params.sortType.trim().charAt(0).toLowerCase();
  if (sortType == 'y') {
    ({ data, error } = await supabase
      .from('Paintings')
      .select("paintingId,imageFileName,title,shapeId,museumLink,accessionNumber,copyrightText,description,excerpt,yearOfWork,width,height,medium,cost,MSRP,googleLink,googleDescription,wikiLink,jsonAnnotations, Artists!inner(firstName, lastName, nationality, yearOfBirth, yearOfDeath, details, artistLink), Galleries!inner(galleryName,galleryNativeName,galleryCity,galleryAddress,galleryCountry,latitude,longitude,galleryWebSite,flickrPlaceId,yahooWoeId,googlePlaceId)")
      .order('yearOfWork'));
    if (data.length == 0) {
      res.send({ "Error": `No paintings were found that were made in ${req.params.sortType} ...please try another year` });
    } else {
      res.send(data);
    }
  }
  else if (sortType == 't') {
    ({ data, error } = await supabase
      .from('Paintings')
      .select("paintingId,imageFileName,title,shapeId,museumLink,accessionNumber,copyrightText,description,excerpt,yearOfWork,width,height,medium,cost,MSRP,googleLink,googleDescription,wikiLink,jsonAnnotations, Artists!inner(firstName, lastName, nationality, yearOfBirth, yearOfDeath, details, artistLink), Galleries!inner(galleryName,galleryNativeName,galleryCity,galleryAddress,galleryCountry,latitude,longitude,galleryWebSite,flickrPlaceId,yahooWoeId,googlePlaceId)")
      .order('title'));
    if (data.length == 0) {
      res.send({ "Error": `No paintings were found that have the following title ${req.params.sortType} ...please try another year` });
    } else {
      res.send(data);
    }


  }
}
);

// Returns the paintings between two years
app.get('/api/paintings/years/:start/:end', async (req, res) => {


  const { data, error } = await supabase
    .from('Paintings')
    .select("paintingId,imageFileName,title,shapeId,museumLink,accessionNumber,copyrightText,description,excerpt,yearOfWork,width,height,medium,cost,MSRP,googleLink,googleDescription,wikiLink,jsonAnnotations, Artists!inner(firstName, lastName, nationality, yearOfBirth, yearOfDeath, details, artistLink), Galleries!inner(galleryName,galleryNativeName,galleryCity,galleryAddress,galleryCountry,latitude,longitude,galleryWebSite,flickrPlaceId,yahooWoeId,googlePlaceId)")
    .gte('yearOfWork', parseInt(req.params.start))
    .lte('yearOfWork', parseInt(req.params.end))
    .order("yearOfWork", { ascending: true });

  if (parseInt(req.params.end) > parseInt(req.params.start)) {
    res.send(data);
  } else {
    res.send({ "Error": "Your end year is bigger than the start year..please change" });
  }


}
);
// ############################################################
// # Routes for returning specific data based on artist       #  
// ############################################################

// Returns the artists whose last name begins with the provided substring
app.get('/api/artists/search/:substring', async (req, res) => {
  const { data, error } = await supabase
    .from('Artists')
    .select()
    .ilike('lastName', '%' + req.params.substring + '%');
  if (data.length == 0) {
    res.send({ "Error": `No artist were found with the  ${req.params.substring} substring at the start of their lastname...please try another substring name` });
  }
  else {
    res.send(data);
  }
}
);

// Returns all the paintings by a given artist
app.get('/api/paintings/artists/:ref', async (req, res) => {
  const { data, error } = await supabase
    .from('Paintings')
    .select("paintingId,imageFileName,title,shapeId,museumLink,accessionNumber,copyrightText,description,excerpt,yearOfWork,width,height,medium,cost,MSRP,googleLink,googleDescription,wikiLink,jsonAnnotations, Artists!inner(firstName, lastName, nationality, yearOfBirth, yearOfDeath, details, artistLink), Galleries!inner(galleryName,galleryNativeName,galleryCity,galleryAddress,galleryCountry,latitude,longitude,galleryWebSite,flickrPlaceId,yahooWoeId,googlePlaceId)")
    .eq('artistId', req.params.ref)
    .order("title", { ascending: true });
  if (data.length == 0) {
    res.send({ "Error": `No paintings were found by the following artist id: ${req.params.ref}...please try another artist id` });
  } else {
    res.send(data);
  }

}
);
// ############################################################
// # Routes for returning specific data based on gallery      # 
// ############################################################

// Returns all the paintings in a given gallery 
app.get('/api/paintings/galleries/:ref', async (req, res) => {
  const { data, error } = await supabase
    .from('Paintings')
    .select("paintingId,imageFileName,title,shapeId,museumLink,accessionNumber,copyrightText,description,excerpt,yearOfWork,width,height,medium,cost,MSRP,googleLink,googleDescription,wikiLink,jsonAnnotations, Artists!inner(firstName, lastName, nationality, yearOfBirth, yearOfDeath, details, artistLink), Galleries!inner(galleryName,galleryNativeName,galleryCity,galleryAddress,galleryCountry,latitude,longitude,galleryWebSite,flickrPlaceId,yahooWoeId,googlePlaceId)")
    .eq('galleryId', req.params.ref)
    .order("title", { ascending: true });
  if (data.length == 0) {
    res.send({ "Error": `No galleries were found in the following gallery id: ${req.params.ref}...please try another gallery id` });
  } else {
    res.send(data);
  }
}
);

// ############################################################
// # Routes for returning specific data based on genre        # 
// ############################################################

// Returns all the paintings for a given genre
app.get('/api/paintings/genre/:ref', async (req, res) => {
  const { data, error } = await supabase
    .from("PaintingGenres")
    .select("paintingId,Paintings(title, yearOfWork)")
    .eq("genreId", req.params.ref)
    .order("yearOfWork", { referencedTable: "Paintings", ascending: true });
  res.send(data);

});


// ############################################################
// # Routes for returning specific data based on paintings    # 
// ############################################################

// Returns the genres used in a given painting 
app.get('/api/genres/painting/:ref', async (req, res) => {
  const { data, error } = await supabase
    .from('PaintingGenres')
    .select("Paintings!inner(title), Genres!inner(genreName,description,wikiLink, Eras:eraId(eraName,eraYears))")
    .order("genreName", { referencedTable: 'Genres', ascending: true });
  if (data.length == 0) {
    res.send({ "Error": `No paintings exist with id: ${req.params.ref}...please try another painting id` });
  }
  else {
    res.send(data);
  }

});
// ############################################################
// # Routes for returning specific data based on eras         # 
// ############################################################

// Returns all the paintings for a given era
app.get('/api/paintings/era/:ref', async (req, res) => {
  const { data, error } = await supabase
    .from('PaintingGenres')
    .select('paintingId, Paintings(title, yearOfWork), Genres!inner(*, Eras:eraId(*))')
    .eq('Genres.Eras.eraId', req.params.ref)
    .order("yearOfWork", { referencedTable: "Paintings", ascending: true });
  if (data.length == 0) {
    res.send({ "Error": `No eras exist with id: ${req.params.ref}...please try another era id` });
  }
  else {
    res.send(data);
  }

});

// ############################################################
// # Routes for returning counts                              # 
// ############################################################

// Returns the genre name and the number of paintings for each genre
app.get('/api/counts/genres', async (req, res) => {
  const { data, error } = await supabase
    .from('Genres')
    .select('genreId, genreName, PaintingGenres(count)')
    .order("count", { referencedTable: 'PaintingGenres', ascending: true });
  res.send(data);

});

// Returns the artist name and the number of paintings they made
app.get('/api/counts/artists', async (req, res) => {
  const { data, error } = await supabase
    .from('Artists')
    .select('firstName, lastName, Paintings(count)')
    .order("count", { referencedTable: "Paintings", ascending: true });
  res.send(data);
});

// Returns the genre name and the number of paintings for each genre
app.get('/api/counts/topgenres/:ref', async (req, res) => {
  console.log(req.params.ref);
  const { data, error } = await supabase
    .from('Genres')
    .select("genreName,PaintingGenres(count)")
    .gt("PaintingGenres.count", {});
  if (data.length == 0) {
    res.send({ "Error": `Please use another number in the parameter..${req.params.ref} is high of a number` });
  }
  else {
    res.send(data);
  }
});

// ############################################################
// # Server setup                                             #                                                        
// ############################################################

let port = 8080;
app.listen(port, () => {
  // console.log("http://localhost:8080/api/");
});