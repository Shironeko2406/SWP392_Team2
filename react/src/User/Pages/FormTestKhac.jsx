import React, { useEffect, useState } from 'react'

const FormTestKhac = () => {
    const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    setSelectedDistrict('');
    setSelectedWard('');

    const selectedCity = cities.find(city => city.Id === cityId);
    setDistricts(selectedCity ? selectedCity.Districts : []);
    setWards([]);
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    setSelectedWard('');

    const selectedDistrict = districts.find(district => district.Id === districtId);
    setWards(selectedDistrict ? selectedDistrict.Wards : []);
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };


  return (
    <div>
      <select className="form-select form-select-sm mb-3" id="city" value={selectedCity} onChange={handleCityChange} aria-label=".form-select-sm">
        <option value="">Chọn tỉnh thành</option>
        {cities.map(city => (
          <option key={city.Id} value={city.Id}>{city.Name}</option>
        ))}
      </select>

      <select className="form-select form-select-sm mb-3" id="district" value={selectedDistrict} onChange={handleDistrictChange} aria-label=".form-select-sm" disabled={!selectedCity}>
        <option value="">Chọn quận huyện</option>
        {districts.map(district => (
          <option key={district.Id} value={district.Id}>{district.Name}</option>
        ))}
      </select>

      <select className="form-select form-select-sm" id="ward" value={selectedWard} onChange={handleWardChange} aria-label=".form-select-sm" disabled={!selectedDistrict}>
        <option value="">Chọn phường xã</option>
        {wards.map(ward => (
          <option key={ward.Id} value={ward.Id}>{ward.Name}</option>
        ))}
      </select>
    </div>
  )
}

export default FormTestKhac