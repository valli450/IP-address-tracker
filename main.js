let getIpInput = document.querySelector(".ipnumbers");
const ipAddressBlock = document.querySelector(".tb-ip-address");
const ipLocationBlok = document.querySelector(".tb-ip-location");
const ipTimeZone = document.querySelector(".tb-ip-timezone");
const ipIsp = document.querySelector(".tb-ip-isp");




let map = L.map('content__map').setView([42.2803, -71.25], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
L.marker([42.2803, -71.25]).addTo(map);



async function getVisitorIp() {
    let finalUrl = `https://api.freegeoip.app/json/${getIpInput.value}?apikey=8afffe90-afbe-11ec-bd45-1f3f00f87574`;
    fetch(finalUrl)
    .then((response) => {
        response.json()
        .then(data => {
            console.log(data)
            ipAddressBlock.innerHTML = `<p class="text-bold tb-ip-address">${data.ip}</p>`;
            getIpInput.placeholder = `${data.ip}`;
            let visitorCity = data.city.length > 0 ? `${data.city},`: '';
            ipLocationBlok.innerHTML = `<p class="text-bold tb-ip-location">${visitorCity} ${data.region_code} ${data.zip_code} ${data.country_code}</p>`;
            ipTimeZone.innerHTML = `<p class="text-bold tb-ip-timezone">${data.time_zone}</p>`;
            let visitorIsp = data.isp ? `${data.isp}` : 'undefined';
            ipIsp.innerHTML = `<p class="text-bold tb-ip-isp">${visitorIsp}</p>`;
            map.setView([data.latitude, data.longitude], 14)
            L.marker([data.latitude, data.longitude]).addTo(map);
        })
    })
}





