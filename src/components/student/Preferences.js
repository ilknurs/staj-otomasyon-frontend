import { useEffect, useState } from 'react';
import { fetchCompanies, fetchPreferences, setPreferences } from '../../services/studentService';

export default function Preferences() {
  const [periods, setPeriods] = useState([]);
  const [prefs, setPrefs]     = useState(['','','']);

  useEffect(()=>{
    fetchCompanies().then(setPeriods);
    fetchPreferences().then(p=>{
      setPrefs(p.concat(Array(3-p.length).fill('')));
    });
  }, []);

  const save = () => {
    setPreferences(prefs.slice(0,3))
      .then(()=>alert('Tercihler kaydedildi'));
  };

  return (
    <div>
      <h2 className="text-xl mb-4">İşyeri Tercihleri</h2>
      <div className="space-y-2">
        {[0,1,2].map(i=>(
          <div key={i} className="flex items-center gap-4">
            <label>{i+1}. Tercih:</label>
            <select
              value={prefs[i]}
              onChange={e=>{
                const c = [...prefs];
                c[i] = e.target.value;
                setPrefs(c);
              }}
              className="border p-1 flex-1"
            >
              <option value="">Seçiniz</option>
              {periods.map(c=>(
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button onClick={save} className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
        Kaydet
      </button>
    </div>
  );
}
