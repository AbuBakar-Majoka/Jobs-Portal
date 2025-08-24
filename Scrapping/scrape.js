const axios = require("axios");
const cheerio = require("cheerio");

const jobTypes = ["Part Time", "Internship", "Full Time"];

function getRandomJobType() {
  return jobTypes[Math.floor(Math.random() * jobTypes.length)];
}

function parsePostingDate(postingDateStr) {
  const now = new Date();
  const regex = /(\d+)\s*(d|mo|w)\s*ago/i;
  const match = postingDateStr.match(regex);

  if (match) {
    const value = parseInt(match[1]);
    const unit = match[2];

    if (unit === "d") {
      now.setDate(now.getDate() - value);
    } else if (unit === "w") {
      now.setDate(now.getDate() - value * 7);
    } else if (unit === "mo") {
      now.setMonth(now.getMonth() - value);
    }
    return now.toISOString().slice(0, 10);
  }

  // Try to parse direct date string
  const parsed = new Date(postingDateStr);
  if (!isNaN(parsed)) {
    return parsed.toISOString().slice(0, 10);
  }

  // Default to today
  return now.toISOString().slice(0, 10);
}

async function scrapeJobsFromPage(page) {
  const url = `https://www.actuarylist.com/?page=${page}`;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const jobs = [];

    $(".Job_job-card__YgDAV").each((i, elem) => {
      const jobTitle = $(elem)
        .find(".Job_job-card__position__ic1rc")
        .text()
        .trim();
      const companyName = $(elem)
        .find(".Job_job-card__company__7T9qY")
        .text()
        .trim();
      const location = $(elem)
        .find(".Job_job-card__country__GRVhK")
        .text()
        .trim();
      const postingDateRaw = $(elem)
        .find(".Job_job-card__posted-on__NCZaJ")
        .text()
        .trim();

      const posting_date = parsePostingDate(postingDateRaw);

      const tags = [];
      $(elem)
        .find(".Job_job-card__tags__zfriA .Job_job-card__location__bq7jX")
        .each((j, tagElem) => {
          tags.push($(tagElem).text().trim());
        });

      jobs.push({
        title: jobTitle,
        company: companyName,
        location,
        posting_date,
        job_type: getRandomJobType(),
        tags: JSON.stringify(tags),
      });
    });

    return jobs;
  } catch (error) {
    console.error(`Error scraping page ${page}:`, error.message);
    return [];
  }
}

async function insertJob(job) {
  try {
    const apiUrl = "http://localhost:5000/api/jobs";
    const res = await axios.post(apiUrl, job);
    console.log(`Inserted: ${job.title} (${res.data.jobId})`);
  } catch (err) {
    console.error(
      `Error inserting job: ${job.title}`,
      err.response?.data || err.message
    );
  }
}

async function scrapeAllJobs() {
  let page = 1;
  let allJobs = [];
  let hasMore = true;

  while (hasMore && allJobs.length < 100) {
    const jobs = await scrapeJobsFromPage(page);
    if (jobs.length === 0) {
      hasMore = false;
      break;
    }
    for (const job of jobs) {
      if (allJobs.length < 100) {
        await insertJob(job);
        allJobs.push(job);
      } else {
        hasMore = false;
        break;
      }
    }
    page++;
  }
}

scrapeAllJobs();