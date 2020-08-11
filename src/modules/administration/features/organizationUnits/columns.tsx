import { DataColumn } from "core/components/dataTable/_types";
import { fetchMembers } from "core/helpers/api/MemberFetcher";
import { SpisumGroups } from "enums";
import { classPath, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { Member, membersProxy } from "./_types";

export const getColumns = async (): Promise<DataColumn<Member>[]> => {
  const membersDispatch = await fetchMembers(SpisumGroups.Dispatch0);
  const membersRepository = await fetchMembers(SpisumGroups.Repository);

  return [
    {
      keys: [classPath(membersProxy.id).path],
      label: t(translationPath(lang.general.id))
    },
    {
      keys: [classPath(membersProxy.displayName).path],
      label: t(translationPath(lang.general.name))
    },
    {
      getValue: (item: Member) => {
        return item.id === SpisumGroups.Mailroom
          ? t(translationPath(lang.general.yes))
          : t(translationPath(lang.general.no));
      },
      keys: [classPath(membersProxy.id).path],
      label: t(translationPath(lang.general.isMailroom))
    },
    {
      getValue: (item: Member) => {
        return membersDispatch.entities.find((el) => el.id === item.id)
          ? t(translationPath(lang.general.yes))
          : t(translationPath(lang.general.no));
      },
      keys: [classPath(membersProxy.id).path],
      label: t(translationPath(lang.general.isDispatch))
    },
    {
      getValue: (item: Member) => {
        return membersRepository.entities.find((el) => el.id === item.id)
          ? t(translationPath(lang.general.yes))
          : t(translationPath(lang.general.no));
      },
      keys: [classPath(membersProxy.id).path],
      label: t(translationPath(lang.general.isRepository))
    }
  ];
};

export const fallbackColumns = (): DataColumn<Member>[] => {
  return [
    {
      keys: [classPath(membersProxy.id).path],
      label: t(translationPath(lang.general.id))
    },
    {
      keys: [classPath(membersProxy.displayName).path],
      label: t(translationPath(lang.general.name))
    },
    {
      getValue: (item) => "",
      keys: [classPath(membersProxy.id).path],
      label: t(translationPath(lang.general.isMailroom))
    },
    {
      getValue: (item) => "",
      keys: [classPath(membersProxy.id).path],
      label: t(translationPath(lang.general.isDispatch))
    },
    {
      getValue: (item) => "",
      keys: [classPath(membersProxy.id).path],
      label: t(translationPath(lang.general.isRepository))
    }
  ];
};
