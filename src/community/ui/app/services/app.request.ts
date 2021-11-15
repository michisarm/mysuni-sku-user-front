import { useEffect } from 'react';
import { findProfile } from '../../data/community/apis/profilesApi';
import { findFollowCount } from '../../data/community/apis/followApi';
import {
  setAppProfile,
  setAvailableColleges,
  setChannels,
  setCollegeBanners,
  setColleges,
  setTopBannerViewModel,
} from './app.services';
import { profileToAppProfile } from '../models/app.profile';
import { checkExternalInstructor } from '../../app.services';
import { findInternalPisAgreement } from '../../data/instructor/apis/pisAgreementApi';
import { findMyPisAgreement } from '../../data/profile/apis/pisAgreementApi';
import {
  findAllCollegeCache,
  findAvailableCollegeCache,
  findCollegeBanners,
} from '../../data/college/apis/collegeApi';
import { CollegeIdName } from '../models/app.college';
import {
  findAvailablePageElements,
  findLatestBannerBundles,
} from '../../data/arrange/apis/apis';
import { parsePolyglotString } from '../../../packages/polyglot/PolyglotString';
import { getDefaultLang } from '../../../packages/polyglot/LangSupport';
import { onLogin } from '../../../packages/login/onLogin';

const PROTOCOL = window.location.protocol;
const HOST = window.location.host;
const AGREEMENT_FORM_ID = '20210622-1';
const SERVICE_ID = 'SUNI';

export function useRequestProfile() {
  useEffect(() => {
    requestProfile();
  }, []);
}

export function requestProfile() {
  findProfile().then((profile) => {
    if (profile !== undefined) {
      findFollowCount(profile.id).then((followCount) => {
        const appProfile = profileToAppProfile(profile);
        appProfile.followerCount = followCount?.followerCount || 0;
        appProfile.followingCount = followCount?.followingCount || 0;
        setAppProfile(appProfile);
      });
    }
  });
}

export function useRequestColleges() {
  useEffect(() => {
    requestColleges();
    requestAvailableColleges();
    requestCollegeBanners();
    requestTopBanner();
  }, []);
}

export async function requestColleges() {
  const colleges = await findAllCollegeCache();
  if (colleges === undefined) {
    return;
  }

  const collegeIdNames: CollegeIdName[] = colleges.map((college) => {
    return {
      id: college.id,
      name: parsePolyglotString(
        college.name,
        getDefaultLang(college.langSupports)
      ),
    };
  });
  setColleges(collegeIdNames);
  const channelIdNames: CollegeIdName[] = [];
  colleges.forEach((college) => {
    college.channels.forEach((channel) => {
      channelIdNames.push({
        id: channel.id,
        name: parsePolyglotString(
          channel.name,
          getDefaultLang(channel.langSupports)
        ),
      });
    });
  });
  setChannels(channelIdNames);
}

export async function requestAvailableColleges() {
  const colleges = await findAvailableCollegeCache();
  if (colleges === undefined) {
    return;
  }
  setAvailableColleges(colleges);
}

export async function requestCollegeBanners() {
  const collegeBanners = await findCollegeBanners();
  if (collegeBanners === undefined) {
    return;
  }
  setCollegeBanners(collegeBanners);
}

export async function requestTopBanner() {
  const bannerBundleWithBannerRom = await findLatestBannerBundles(true);
  if (bannerBundleWithBannerRom === undefined) {
    return;
  }
  const banner = bannerBundleWithBannerRom.banners[0];
  if (banner === undefined || banner === null) {
    return;
  }

  setTopBannerViewModel({
    top: bannerBundleWithBannerRom.top,
    topBgColor: bannerBundleWithBannerRom.topBgColor,
    target: banner.target,
    linkUrl: banner.targetUrl,
    imageUrl: parsePolyglotString(
      banner.imageUrl,
      getDefaultLang(banner.langSupports)
    ),
    imageAlt: parsePolyglotString(
      banner.imageAlt,
      getDefaultLang(banner.langSupports)
    ),
  });
}

export function useRequestPisAgreement() {
  useEffect(() => {
    const isExternalInstructor = checkExternalInstructor();
    if (isExternalInstructor === true) {
      requestInstructorPisAgreement();
    } else {
      requestPisAgreement();
    }
  }, []);
}

export async function requestInstructorPisAgreement() {
  const pisAgreement = await findInternalPisAgreement(
    AGREEMENT_FORM_ID,
    SERVICE_ID
  );
  if (pisAgreement === undefined) {
    window.location.href = `${PROTOCOL}//${HOST}/suni-main/profile/agreement`;
    return;
  }
}

export async function requestPisAgreement() {
  const pisAgreement = await findMyPisAgreement(AGREEMENT_FORM_ID, SERVICE_ID);
  if (pisAgreement === undefined) {
    window.location.href = `${PROTOCOL}//${HOST}/suni-main/profile/agreement`;
    return;
  }
}

export async function isCheckedAllowCommunity() {
  const available = await findAvailablePageElements();

  if (available === undefined) {
    window.location.href = '/suni-main';
    return;
  }

  const isAvailable = available.some((item) => item.type === 'Community');

  if (!isAvailable) {
    window.location.href = '/suni-main';
    return false;
  }

  return true;
}

export function requestLogin() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const host = window.location.host;

  if (isDevelopment && host.includes('localhost')) {
    onLogin();
  }
}
