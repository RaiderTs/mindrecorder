import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mrApi = createApi({
  reducerPath: 'mrApi',
  tagTypes: ['Media', 'UserInfo', 'Trash', 'Workspace', 'Folder'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.mindrecorder.io',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (build) => ({
    // user

    editUserInfo: build.mutation({
      query: (body) => ({
        url: '/account/edit',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['UserInfo'],
    }),

    getCurrentUserInfo: build.query({
      query: () => ({
        url: '/account/info',
      }),
      providesTags: ['UserInfo'],
    }),

    //  media

    getMedia: build.query({
      query: (body) => ({
        url: '/media',
        body,
      }),
      providesTags: ['Media'],
    }),

    deleteMediaById: build.mutation({
      query: (id) => {
        return {
          url: `/media/${id}/delete`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Media', 'Trash'],
    }),

    getMediaInfoById: build.query({
      query: (id) => {
        return {
          url: `/media/${id}`,
        };
      },
      providesTags: ['Media'],
    }),

    // trash

    getListOfTrash: build.query({
      query: () => {
        return {
          url: `/trash`,
        };
      },
      providesTags: ['Trash'],
    }),

    deleteMediaByIdFromTrash: build.mutation({
      query: (id) => {
        return {
          url: `/trash/${id}/delete`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Trash'],
    }),

    deleteAllMediaFromTrash: build.mutation({
      query: (id) => {
        return {
          url: `trash/empty`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Trash'],
    }),

    recoveryMediaFromTrash: build.mutation({
      query: (id) => {
        return {
          url: `trash/${id}/recovery`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Trash', 'Media'],
    }),

    // Workspace

    getListOfWorkspaces: build.query({
      query: () => {
        return {
          url: `workspaces`,
        };
      },
      providesTags: ['Workspace'],
    }),

    getWorkspaceInfo: build.query({
      query: (workspaceId) => {
        return {
          url: `workspace/${workspaceId}`,
        };
      },
      providesTags: ['Workspace'],
    }),

    getWorkspaceMemberList: build.query({
      query: (workspaceId) => {
        return {
          url: `workspace/${workspaceId}/members`,
        };
      },
      providesTags: ['Workspace'],
    }),

    addNewMemberToWorkspace: build.mutation({
      query: (options) => {
        const { workspaceId, emails } = options;
        return {
          url: `workspace/${workspaceId}/members/add`,
          body: emails,
          method: 'POST',
        };
      },
      invalidatesTags: ['Workspace'],
    }),

    createNewWorkspace: build.mutation({
      query: (body) => {
        return {
          url: `workspace/create`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Workspace'],
    }),

    deleteMemberFromWorkspace: build.mutation({
      query: (workspaceId) => {
        return {
          url: `workspace/${workspaceId}/members/delete`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Workspace'],
    }),

    deleteWorkspaceById: build.mutation({
      query: (workspaceId) => {
        return {
          url: `workspace/${workspaceId}/delete`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Workspace'],
    }),

    workspaceSettings: build.mutation({
      query: (options) => {
        const { workspaceId, body } = options;
        return {
          url: `workspace/${workspaceId}/settings`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Workspace'],
    }),

    // Folder in  workspace

    createNewFolder: build.mutation({
      query: (options) => {
        const { workspaceId, body } = options;
        return {
          url: `workspace/${workspaceId}/folder/create`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Folder', 'Workspace'],
    }),

    deleteFolderById: build.mutation({
      query: (options) => {
        const { workspaceId, folderId } = options;
        return {
          url: `workspace/${workspaceId}/folder/${folderId}/delete`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Folder', 'Workspace'],
    }),

    getFolderInfo: build.query({
      query: (options) => {
        const { workspaceId, folderId } = options;
        return {
          url: `workspace/${workspaceId}/folder/${folderId}`,
        };
      },
      providesTags: ['Folder'],
    }),

    getFolderMediaList: build.query({
      query: (options) => {
        const { workspaceId, folderId } = options;
        return {
          url: `workspace/${workspaceId}/folder/${folderId}/media`,
        };
      },
      providesTags: ['Folder'],
    }),

    getListOfFoldersInWorkspace: build.query({
      query: (workspaceId) => {
        // const { workspaceId, body } = options;
        return {
          url: `workspace/${workspaceId}/folders`,
          // body,
        };
      },
      providesTags: ['Folder'],
    }),

    unpinFolder: build.mutation({
      query: (options) => {
        const { workspaceId, folderId, body } = options;
        return {
          url: `workspace/${workspaceId}/folder/${folderId}/pin`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Folder'],
    }),

    renameFolder: build.mutation({
      query: (options) => {
        const { workspaceId, folderId, body } = options;
        return {
          url: `workspace/${workspaceId}/folder/${folderId}/rename`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Folder'],
    }),
  }),
});

export const {
  // user
  useGetCurrentUserInfoQuery,
  // media
  useGetMediaInfoByIdQuery,
  useGetMediaQuery,
  useDeleteMediaByIdMutation,
  // trash
  useGetListOfTrashQuery,
  useDeleteMediaByIdFromTrashMutation,
  useDeleteAllMediaFromTrashMutation,
  useRecoveryMediaFromTrashMutation,
  // workspace
  useGetListOfWorkspacesQuery,
  useGetWorkspaceInfoQuery,
  useGetWorkspaceMemberListQuery,
  useAddNewMemberToWorkspaceMutation,
  useCreateNewWorkspaceMutation,
  useDeleteMemberFromWorkspaceMutation,
  useDeleteWorkspaceByIdMutation,
  useWorkspaceSettingsMutation,
  // folder_in_workspace
  useCreateNewFolderMutation,
  useDeleteFolderByIdMutation,
  useGetFolderInfoQuery,
  useGetFolderMediaListQuery,
  useGetListOfFoldersInWorkspaceQuery,
  useUnpinFolderMutation,
  useRenameFolderMutation,
} = mrApi;
