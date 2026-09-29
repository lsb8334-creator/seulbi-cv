const el = (id) => document.getElementById(id);
const set = (id, value) => { if (el(id)) el(id).textContent = value; };

if (el('welcome')) {
  el('enter-site').addEventListener('click', () => el('welcome').classList.add('is-hidden'));
}

const records = (id, items) => {
  if (!el(id)) return;
  el(id).innerHTML = items.map(({ date, title, place }) =>
    `<article class="record"><p class="date">${date}</p><div><h2>${title}</h2><p>${place}</p></div></article>`
  ).join('');
};

set('intro', profile.intro);
set('research-interests', profile.researchInterests);
set('in-progress-title', profile.inProgress.title);
set('in-progress-description', profile.inProgress.description);
set('in-progress-status', profile.inProgress.status);

records('education', profile.education);
records('presentations-list', profile.presentations);
records('awards', profile.awards);
records('experience-list', profile.experience);

if (el('athletic')) {
  el('athletic').innerHTML = profile.athletic.map(item => `<li>${item}</li>`).join('');
}

set('research-tools', profile.researchTools);
set('creative-tools', profile.creativeTools);
set('memberships', profile.memberships);

if (el('creative-list')) {
  el('creative-list').innerHTML = profile.creative.map(({ title, text, image, video }) =>
    `<button class="creative-item" data-image="${image}" data-video="${video || ''}" data-title="${title}"><h2>${title}</h2><p>${text}</p><span>${video ? 'View work' : 'View idea board'} →</span></button>`
  ).join('');

  const dialog = el('idea-dialog');
  const image = el('idea-image');
  const video = el('idea-video');
  const caption = el('idea-caption');

  document.querySelectorAll('.creative-item').forEach(item => item.addEventListener('click', () => {
    image.src = item.dataset.image;
    image.alt = `${item.dataset.title} idea board`;
    caption.textContent = item.dataset.title;
    video.src = item.dataset.video;
    video.hidden = !item.dataset.video;
    dialog.showModal();
  }));

  const closeDialog = () => {
    video.src = '';
    dialog.close();
  };

  dialog.querySelector('.dialog-close').addEventListener('click', closeDialog);
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeDialog();
  });
}
