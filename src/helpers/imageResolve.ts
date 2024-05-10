import npmPackage from '../../package.json';

type extensions = 'png' | 'webp';

export default function imageResolve(img: string, ext: extensions = 'png') {
  return npmPackage.homepage + '/' + img + '.' + ext;
}
