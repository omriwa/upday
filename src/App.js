import React, { useState, useEffect,useRef } from 'react';
import './App.css';
import { Select } from './component/Select';



const App = () => {
  const [data, setData] = useState(null);
  const [pageLangueges, setPageLanguages] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const usePrevious = value => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const preSelectedLanguage = usePrevious(selectedLanguage);

  useEffect(() => {
    if (!data || preSelectedLanguage != selectedLanguage) {
      var url = 'https://' + selectedLanguage + '.wikipedia.org/w/api.php';

      var parsParams = {
        action: 'parse',
        pageid: 25523,
        format: 'json',
        inprop: "varianttitles"
      };

      url = url + '?origin=*';
      Object.keys(parsParams).forEach(function (key) { url += '&' + key + '=' + parsParams[key]; });

      fetch(url)
        .then(response => response.json())
        .then(response => {
          const parsedData = response.parse;
          
          setData(parsedData);
          if (!pageLangueges)
            setPageLanguages([...parsedData.langlinks.map(langLink => langLink.lang), 'en']);
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
