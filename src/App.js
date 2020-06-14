import React, { useState, useEffect } from 'react';
import './App.css';
import { Select } from './component/Select';



const App = () => {
  const [data, setData] = useState(null);
  const [pageLangueges, setPageLangueges] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  console.log('app',selectedLanguage)
  useEffect(() => {
    if (!data) {
      var url = 'https://' + selectedLanguage + '.wikipedia.org/w/api.php';

      var params = {
        action: 'parse',
        pageid: 25523,
        format: 'json',
        inprop: "varianttitles"
      };

      url = url + '?origin=*';
      Object.keys(params).forEach(function (key) { url += '&' + key + '=' + params[key]; });

      fetch(url)
        .then(response => response.json())
        .then(response => {
          const parsedData = response.parse;
          
          setData(parsedData);
          setPageLangueges(parsedData.langlinks.map(langLink => langLink.lang));
        })
        .catch(function (error) { console.log(error); });
    }


  }, [data,selectedLanguage]);

  console.log(data)

  return <div>
    <div>
      <Select
        options={pageLangueges}
        onOptionChange={setSelectedLanguage}
        selectedOption={selectedLanguage}
      />
    </div>

    {
      data
      &&
      <div>
          {
            data.text
            &&
            data.text['*']
            &&
            <p dangerouslySetInnerHTML={{__html: data.text['*']}} />
          }
      </div>
    }
  </div>
}

export default App;
