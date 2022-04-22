const search = 'https://www.chemistwarehouse.co.nz/buy/1159/betadine-sore-throat-ready-to-use-120ml';
//const regex = /1159/;
const regex = RegExp(1159);
const result = regex.exec(search);
if(regex.test(search)) { console.log("Found ",result[0]); }
else { console.log("Not Found"); }
/*
let search2 = 
"Shelf Life \
7 Days \
Unit \
1 kg \
Shelf Life \
7 Days \
Manufacturer Details \
9th floor, Wework Building, Outer Ring Road, Near central mall, Bellandur, Bangalore-560103	\
Marketed By	\
63 Ideas Infolabs Pvt. Ltd \
Customer Care Details \
Customer Care No. 1-800-208-2400 \
Customer Care Mail Id: mailto:customercare@handsontrade.com	\
Customer Care No. 1-800-208-8888 \
Customer Care Mail Id: mailto:info@grofers.com \
Disclaimer \
Every effort is made to maintain the accuracy of all information. However, actual product packaging and materials may contain more and/or different information. It is recommended not to solely rely on the information presented.";
//const regex2 = /(?s)(Manufacturer)(.*?)(@grofers.com)/;
//const regex2 = RegExp(?s(Manufacturer).*?(@grofers.com));
//const regex2 = /Manufacturer/;
const regex2 = /Manufacturer Details 9th floor, Wework Building, Outer Ring Road, Near central mall, Bellandur, Bangalore-560103 Marketed By 63 Ideas Infolabs Pvt. Ltd Customer Care Details Customer Care Details Customer Care No. 1-800-208-2400 Customer Care Mail Id: mailto:customercare@handsontrade.com Customer Care No. 1-800-208-8888 Customer Care Mail Id: mailto:info@grofers.com/gm;
const result2 = regex2.exec(search2);
if(regex2.test(search2)) { console.log("Found ",result2[0]); }
else { console.log("Not Found"); } */