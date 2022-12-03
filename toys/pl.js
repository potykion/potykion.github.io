let links = [...document.querySelectorAll('a')]
    .map(a => a.href)
    .filter(l => l.indexOf('viewtopic.php') !== -1)
    .filter(l => !l.endsWith('#'))
    .filter(l => !l.endsWith('2253962'))
    .filter(l => !l.endsWith('980423'))
    .filter(l => !l.endsWith('2862111'))
    .filter(l => !l.endsWith('2565922'))
links = [...new Set(links)];

console.log(links.join('\n'))