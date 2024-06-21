const axios = require('axios');
const cheerio = require('cheerio');

const diseaseUrls = {
  CANCER: [
    { url: 'https://www.alodokter.com/penyakit-kanker', title: 'Penyakit Kanker - Alodokter' },
    { url: 'https://www.siloamhospitals.com/informasi-siloam/artikel/apa-itu-kanker', title: 'Apa Itu Kanker - Siloam Hospitals' },
    { url: 'https://www.prudential.co.id/id/pulse/article/apa-itu-penyakit-kanker', title: 'Apa Itu Penyakit Kanker - Prudential Indonesia' },
    { url: 'https://www.halodoc.com/kesehatan/kanker', title: 'Kanker - Halodoc' },
    { url: 'https://ayosehat.kemkes.go.id/topik-penyakit/neoplasma/kanker', title: 'Neoplasma Kanker - Ayo Sehat Kemkes' },
    { url: 'https://www.biofarma.co.id/id/announcement/detail/kanker-gejala-penyebab-dan-pencegahan', title: 'Kanker: Gejala, Penyebab, dan Pencegahan - Bio Farma' },
    { url: 'https://bumame.com/blog/tips-kesehatan/kanker-penyebab-gejala-dan-jenis-bumame', title: 'Kanker: Penyebab, Gejala, dan Jenis - Bumame' },
    { url: 'https://www.ekahospital.com/better-healths/kanker-dan-tumor/macammacam-kanker-yang-menyerang-tubuh-mulai-dari-kepala-hingga-darah', title: 'Macam-Macam Kanker - Eka Hospital' },
    { url: 'https://p2ptm.kemkes.go.id/infographic-p2ptm/penyakit-kanker/apa-itu-kanker', title: 'Infographic: Apa Itu Kanker - Kementerian Kesehatan' },
    { url: 'https://iccc.id/tanda-dan-gejala-kanker-secara-umum', title: 'Tanda dan Gejala Kanker Secara Umum - ICCC' },
  ],
  COVID: [
    { url: 'https://www.halodoc.com/kesehatan/coronavirus', title: 'Coronavirus - Halodoc' },
    { url: 'https://www.alodokter.com/virus-corona', title: 'Virus Corona - Alodokter' },
    { url: 'https://rsud.acehjayakab.go.id/berita/kategori/covid-19/penyebab-gejala-dan-pencegahan-virus-corona', title: 'Penyebab, Gejala, dan Pencegahan Virus Corona - RSUD Aceh Jaya' },
    { url: 'https://www.who.int/health-topics/coronavirus#tab=tab_1', title: 'Coronavirus - World Health Organization' },
    { url: 'https://infeksiemerging.kemkes.go.id/dashboard/covid-19', title: 'Dashboard COVID-19 - Kementerian Kesehatan' },
    { url: 'https://rsud.pasuruankota.go.id/depan/virus', title: 'Virus - RSUD Pasuruan Kota' },
    { url: 'https://pengabdian.ugm.ac.id/covid19', title: 'COVID-19 - Pengabdian UGM' },
    { url: 'https://www.klikdokter.com/penyakit/masalah-infeksi/coronavirus', title: 'Coronavirus - Klikdokter' },
    { url: 'https://www.prudential.co.id/id/pulse/article/pahami-gejala-corona-yang-terjadi-dari-hari-ke-hari-pada-tubuh', title: 'Pahami Gejala Corona - Prudential Indonesia' },
    { url: 'https://www.allianz.co.id/explore/ini-ciri-ciri-gejala-covid19-terbaru-dari-cdc.html', title: 'Ini Ciri-Ciri Gejala COVID-19 Terbaru dari CDC - Allianz Indonesia' },
  ],
  FIBROSIS: [
    { url: 'https://www.siloamhospitals.com/informasi-siloam/artikel/apa-itu-cystic-fibrosis', title: 'Apa Itu Cystic Fibrosis - Siloam Hospitals' },
    { url: 'https://www.alodokter.com/cystic-fibrosis', title: 'Cystic Fibrosis - Alodokter' },
    { url: 'https://www.halodoc.com/kesehatan/cystic-fibrosis', title: 'Cystic Fibrosis - Halodoc' },
    { url: 'https://my.clevelandclinic.org/health/diseases/9358-cystic-fibrosis', title: 'Cystic Fibrosis - Cleveland Clinic' },
    { url: 'https://www.pennmedicine.org/for-patients-and-visitors/patient-information/conditions-treated-a-to-z/cystic-fibrosis', title: 'Cystic Fibrosis - Penn Medicine' },
    { url: 'https://www.mayoclinic.org/diseases-conditions/pulmonary-fibrosis/symptoms-causes/syc-20353690', title: 'Pulmonary Fibrosis - Mayo Clinic' },
    { url: 'https://www.nhlbi.nih.gov/health/cystic-fibrosis/causes', title: 'Causes of Cystic Fibrosis - NHLBI' },
    { url: 'https://yankes.kemkes.go.id/view_artikel/742/fibrosis-paru', title: 'Fibrosis Paru - Kementerian Kesehatan' },
    { url: 'https://www.hopkinsmedicine.org/health/conditions-and-diseases/interstitial-lung-disease-pulmonary-fibrosis', title: 'Interstitial Lung Disease - Johns Hopkins Medicine' },
    { url: 'https://www.klikdokter.com/penyakit/masalah-pernapasan/cystic-fibrosis', title: 'Cystic Fibrosis - Klikdokter' },
  ],
  PLEURAL_THICKENING: [
    { url: 'https://www.asbestos.com/mesothelioma/pleural-thickening', title: 'Pleural Thickening - Asbestos.com' },
    { url: 'https://www.mesothelioma.com/asbestos-cancer/pleural-thickening', title: 'Pleural Thickening - Mesothelioma.com' },
    { url: 'https://www.mesothelioma.com/asbestos-cancer/pleural-thickening', title: 'Pleural Thickening - Mesothelioma.com' },
    { url: 'https://radiopaedia.org/articles/pleural-thickening', title: 'Pleural Thickening - Radiopaedia' },
    { url: 'https://www.mesotheliomahub.com/mesothelioma/pleural-thickening', title: 'Pleural Thickening - Mesothelioma Hub' },
    { url: 'https://www.sciencedirect.com/topics/medicine-and-dentistry/pleura-thickening', title: 'Pleura Thickening - ScienceDirect' },
    { url: 'https://www.alodokter.com/komunitas/topic/emfisematous-lung-dangan-pleural-thickenning', title: 'Emfisematous Lung Dengan Pleural Thickening - Alodokter' },
    { url: 'https://www.asthmaandlung.org.uk/conditions/asbestos-related-conditions/diffuse-pleural-thickening', title: 'Diffuse Pleural Thickening - Asthma and Lung UK' },
    { url: 'https://www.nationalasbestos.co.uk/asbestos-diseases/pleural-thickening', title: 'Pleural Thickening - National Asbestos Helpline' },
    { url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2553409', title: 'Pleural Thickening - NCBI' },
  ],
  PNEUMONIA: [
    { url: 'https://www.halodoc.com/kesehatan/pneumonia', title: 'Pneumonia - Halodoc' },
    { url: 'https://www.siloamhospitals.com/informasi-siloam/artikel/pneumonia', title: 'Pneumonia - Siloam Hospitals' },
    { url: 'https://www.alodokter.com/pneumonia', title: 'Pneumonia - Alodokter' },
    { url: 'https://www.prudential.co.id/id/pulse/article/gejala-pneumonia', title: 'Gejala Pneumonia - Prudential Indonesia' },
    { url: 'https://dinkes.banjarkota.go.id/gejala-dan-faktor-risiko-pneumonia', title: 'Gejala dan Faktor Risiko Pneumonia - Dinkes Banjarkota' },
    { url: 'https://ciputrahospital.com/radang-paru-paru-pneumonia-yang-perlu-diwaspadai', title: 'Radang Paru-paru (Pneumonia) yang Perlu Diwaspadai - Ciputra Hospital' },
    { url: 'https://puskesmaskutaselatan.badungkab.go.id/artikel/46680-mengenal-apa-itu-pneumonia-penyebab-dan-gejalanya', title: 'Mengenal Apa Itu Pneumonia: Penyebab dan Gejalanya - Puskesmas Kuta Selatan' },
    { url: 'https://dinkes.jakarta.go.id/berita/read/mengenal-penyakit-pneumonia', title: 'Mengenal Penyakit Pneumonia - Dinkes Jakarta' },
    { url: 'https://www.klikdokter.com/penyakit/masalah-pernapasan/radang-paru-paru', title: 'Radang Paru-paru (Pneumonia) - Klikdokter' },
    { url: 'https://www.generali.co.id/id/healthyliving/healthy-protection/penyakit-pneumonia-pengertian-gejala-dan-cara-pencegahannya', title: 'Penyakit Pneumonia: Pengertian, Gejala, dan Cara Pencegahannya - Generali Indonesia' },
    ],
    TBC: [
    { url: 'https://tbindonesia.or.id/apakah-kalian-tahu-apa-itu-tbc', title: 'Apakah Kalian Tahu Apa Itu TBC? - TB Indonesia' },
    { url: 'https://www.siloamhospitals.com/informasi-siloam/artikel/tuberkulosis-atau-tb-adalah', title: 'Tuberkulosis atau TB Adalah - Siloam Hospitals' },
    { url: 'https://www.prudential.co.id/id/pulse/article/apa-itu-penyakit-tbc', title: 'Apa Itu Penyakit TBC? - Prudential Indonesia' },
    { url: 'https://pkm-labuanbajo.manggaraibaratkab.go.id/baca-berita-215-tb-tuberkulosis-pengertian-penyebab-dan-cara-pengobatan.html', title: 'TB (Tuberkulosis): Pengertian, Penyebab, dan Cara Pengobatannya - PKM Labuan Bajo' },
    { url: 'https://www.mitrakeluarga.com/artikel/tuberkulosis', title: 'Tuberkulosis - Mitra Keluarga' },
    { url: 'https://www.halodoc.com/kesehatan/tuberkulosis', title: 'Tuberkulosis - Halodoc' },
    { url: 'https://www.alodokter.com/tuberkulosis', title: 'Tuberkulosis - Alodokter' },
    { url: 'https://www.who.int/news-room/fact-sheets/detail/tuberculosis', title: 'Tuberkulosis - World Health Organization' },
    { url: 'https://ayosehat.kemkes.go.id/topik-penyakit/infeksi-pernapasan--tb/tuberkulosis', title: 'Infeksi Pernapasan: Tuberkulosis - Ayo Sehat Kemkes' },
    { url: 'https://www.herminahospitals.com/id/articles/penyebab-gejala-dan-cara-pengobatan-pada-tbc', title: 'Penyebab, Gejala, dan Cara Pengobatan pada TBC - Hermina Hospitals' },
    ],
};

const getDiseaseInfo = async (disease) => {
  const urls = diseaseUrls[disease.toUpperCase()];
  if (!urls || urls.length === 0) {
    console.error(`No URLs found for disease: ${disease}`);
    return null;
  }

  let results = await Promise.all(urls.map(async ({ url, title }) => {
    try {
      console.log(`Fetching URL: ${url}`);
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const summary = $('meta[name="description"]').attr('content') || 'No description available';
      console.log({ title, summary, url });
      return { title, summary, url };
    } catch (error) {
      console.error('Error fetching data from URL:', url, error);
      return null;
    }
  }));

  return results.filter(result => result !== null);
};

module.exports = { getDiseaseInfo };
