const AUTH_USER_KEY = 'finanzas_local_user_v1';
const USER_WORKSPACES_PREFIX = 'finanzas_user_workspaces_v1::';
const WORKSPACE_ACCESS_PREFIX = 'finanzas_workspace_access_v1::';
const LOCAL_USER = {
  sub: 'local',
  email: 'local@finanzas.app',
  name: 'Modo local'
};
const INVITE_VERSION = 1;

let currentAuthUser = null;
let activeWorkspaceId = null;

function setAppLocked(locked) {
  document.body.classList.toggle('app-locked', locked);
}

function getUserStorageKey(sub) {
  return `${USER_WORKSPACES_PREFIX}${sub}`;
}

function getWorkspaceAccessKey(workspaceId) {
  return `${WORKSPACE_ACCESS_PREFIX}${workspaceId}`;
}

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_USER_KEY) || 'null');
  } catch (e) {
    return null;
  }
}

function setStoredUser(user) {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

function getUserWorkspaces(sub) {
  try {
    return JSON.parse(localStorage.getItem(getUserStorageKey(sub)) || '[]');
  } catch (e) {
    return [];
  }
}

function setUserWorkspaces(sub, workspaces) {
  localStorage.setItem(getUserStorageKey(sub), JSON.stringify(workspaces));
}

function getWorkspaceAccess(workspaceId) {
  try {
    return JSON.parse(localStorage.getItem(getWorkspaceAccessKey(workspaceId)) || 'null');
  } catch (e) {
    return null;
  }
}

function setWorkspaceAccess(workspaceId, access) {
  localStorage.setItem(getWorkspaceAccessKey(workspaceId), JSON.stringify(access));
}

function getOrCreatePersonalWorkspace(user) {
  const personalWorkspaceId = `personal_${user.sub}`;
  let workspaces = getUserWorkspaces(user.sub);
  if (!workspaces.some(w => w.id === personalWorkspaceId)) {
    workspaces.unshift({
      id: personalWorkspaceId,
      label: 'Mis finanzas',
      ownerSub: user.sub,
      ownerEmail: user.email
    });
    setUserWorkspaces(user.sub, workspaces);
  }

  const access = getWorkspaceAccess(personalWorkspaceId);
  if (!access) {
    setWorkspaceAccess(personalWorkspaceId, {
      workspaceId: personalWorkspaceId,
      ownerSub: user.sub,
      ownerEmail: user.email,
      ownerName: user.name,
      invited: [],
      createdAt: new Date().toISOString()
    });
  }

  return personalWorkspaceId;
}

function getActiveDataStorageKey() {
  if (!activeWorkspaceId) return 'finanzasFamiliares_v6::public';
  return `finanzasFamiliares_v6::${activeWorkspaceId}`;
}

function isWorkspaceOwner() {
  const access = getWorkspaceAccess(activeWorkspaceId);
  return !!(currentAuthUser && access && access.ownerSub === currentAuthUser.sub);
}

function updateWorkspaceSelector() {
  const selector = document.getElementById('workspace-selector');
  if (!selector || !currentAuthUser) return;
  const workspaces = getUserWorkspaces(currentAuthUser.sub);
  selector.innerHTML = '';
  workspaces.forEach(w => {
    const opt = document.createElement('option');
    opt.value = w.id;
    opt.textContent = w.label;
    selector.appendChild(opt);
  });
  if (activeWorkspaceId) selector.value = activeWorkspaceId;
}

async function switchWorkspace(workspaceId) {
  if (!workspaceId || workspaceId === activeWorkspaceId) return;
  activeWorkspaceId = workspaceId;
  localStorage.setItem('finanzas_active_workspace_v1', workspaceId);
  await loadState();
  initApp();
  renderCollaborationInfo();
  toast('Espacio actualizado', 'success');
}

function buildInviteCode(workspaceId) {
  const access = getWorkspaceAccess(workspaceId);
  if (!access) return '';
  const payload = {
    v: INVITE_VERSION,
    workspaceId,
    ownerEmail: access.ownerEmail,
    ownerName: access.ownerName,
    createdAt: new Date().toISOString()
  };
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
}

function parseInviteCode(code) {
  try {
    const decoded = decodeURIComponent(escape(atob(code.trim())));
    const payload = JSON.parse(decoded);
    if (!payload?.workspaceId || payload?.v !== INVITE_VERSION) return null;
    return payload;
  } catch (e) {
    return null;
  }
}

function renderCollaborationInfo() {
  const userEmail = document.getElementById('collab-current-user');
  const workspaceMeta = document.getElementById('collab-workspace-meta');
  const inviteBtn = document.getElementById('btn-generate-invite');

  if (userEmail) userEmail.textContent = 'Modo local';
  if (!workspaceMeta) return;

  const access = getWorkspaceAccess(activeWorkspaceId);
  if (!access) {
    workspaceMeta.textContent = 'Sin informacion de espacio.';
    if (inviteBtn) inviteBtn.disabled = true;
    return;
  }

  const invitedCount = Array.isArray(access.invited) ? access.invited.length : 0;
  workspaceMeta.textContent = `Espacio local - colaboradores registrados: ${invitedCount}`;
  if (inviteBtn) inviteBtn.disabled = !isWorkspaceOwner();
}

function generateInviteCode() {
  if (!isWorkspaceOwner()) {
    toast('Solo el espacio principal puede generar invitaciones.', 'error');
    return;
  }
  const targetInput = document.getElementById('collab-invite-code');
  const code = buildInviteCode(activeWorkspaceId);
  targetInput.value = code;
  targetInput.select();
  toast('Codigo de invitacion generado.', 'success');
}

function joinWorkspaceByInvite() {
  if (!currentAuthUser) return;
  const rawCode = (document.getElementById('collab-join-code').value || '').trim();
  const payload = parseInviteCode(rawCode);
  if (!payload) {
    toast('Codigo invalido.', 'error');
    return;
  }

  const workspaces = getUserWorkspaces(currentAuthUser.sub);
  if (!workspaces.some(w => w.id === payload.workspaceId)) {
    workspaces.push({
      id: payload.workspaceId,
      label: `Espacio compartido (${payload.ownerName || payload.ownerEmail})`,
      ownerEmail: payload.ownerEmail
    });
    setUserWorkspaces(currentAuthUser.sub, workspaces);
  }

  const access = getWorkspaceAccess(payload.workspaceId) || {
    workspaceId: payload.workspaceId,
    ownerEmail: payload.ownerEmail || 'local',
    ownerName: payload.ownerName || payload.ownerEmail || 'local',
    invited: []
  };
  access.invited = Array.isArray(access.invited) ? access.invited : [];
  if (!access.invited.includes(currentAuthUser.email)) {
    access.invited.push(currentAuthUser.email);
    setWorkspaceAccess(payload.workspaceId, access);
  }

  updateWorkspaceSelector();
  switchWorkspace(payload.workspaceId);
}

function resetLocalSession() {
  const personalWorkspace = getOrCreatePersonalWorkspace(currentAuthUser);
  localStorage.setItem('finanzas_active_workspace_v1', personalWorkspace);
  updateWorkspaceSelector();
  if (activeWorkspaceId === personalWorkspace) {
    loadState().then(() => {
      initApp();
      renderCollaborationInfo();
    });
  } else {
    switchWorkspace(personalWorkspace);
  }
  toast('Volviste al espacio local principal.', 'info');
}

async function unlockAndInitApp() {
  setAppLocked(false);
  updateWorkspaceSelector();
  renderCollaborationInfo();
  if (!appReady) {
    await loadState();
    appReady = true;
    initApp();
    return;
  }
  await loadState();
  initApp();
}

function setupAuthScreen() {
  const stored = getStoredUser();
  currentAuthUser = stored?.sub ? stored : LOCAL_USER;
  setStoredUser(currentAuthUser);
  const personalWorkspace = getOrCreatePersonalWorkspace(currentAuthUser);
  activeWorkspaceId = localStorage.getItem('finanzas_active_workspace_v1') || personalWorkspace;
  localStorage.setItem('finanzas_active_workspace_v1', activeWorkspaceId);
  unlockAndInitApp();
}
