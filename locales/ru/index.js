const translationRu = (value_used = '', value_total = '') => {
  const translation = {
    // sidebar
    screenshots: 'Скриншоты',
    videos: 'Видео',
    trash: 'Корзина',
    settings: 'Настройки',
    workspace: 'Рабочее пространство',
    new_workspace: 'Добавить',
    storage: 'Хранилище',
    used: `Использовано  ${value_used} видео из ${value_total}`,
    increase: 'Увеличить',
    search: 'Поиск',
    // settings
    settings: 'Настройки',
    basic_settings: 'Базовые настройки',
    language: 'Язык',
    select_language: 'Изменить язык',
    quick_save: 'Быстрое сохранение',
    connect_account: 'Подключить аккаунт',
    notifications: 'Уведомления',
    email_notifications: 'Почтовые уведомления',
    email_notifications_sub:
      'Получать уведомления о новых сообщениях и обновлениях',
    category_notification: 'Уведомления по категориям',
    view_on_my_videos: 'Просмотр на моих видео',
    new_comment_on_my_posts: 'Новый комментарий к моим постах',
    new_answer_on_my_comment: 'Новый ответ на мой комментарий',
    someone_is_sharing_my_content: 'Кто угодно может делится моим контентом',
    folder_updates: 'Обновление папок',
    // select
    date: 'Дата',
    name: 'Имя',
    type: 'Тип',
    user: 'Пользователь',
    only_owner: 'Только владелец',
    all: 'Все',
    // screenshots
    selected_files: 'Выбрано файлов',
    cancel: 'Отмена',
    sort: 'Сортировать',
    // screenshotItem
    screenshot_item: 'Скриншот',
    shared: 'Поделиться',
    copy_link: 'Копировать',
    rename: 'Переименовать',
    move: 'Переместить...',
    download: 'Скачать',
    delete: 'Удалить',
    comments: 'Комментарии',
    viewers_can_download: 'Разрешить скачивание',
    public_access: 'Общий доступ',
    add_description: 'Добавить описание...',
    comments: 'Комментарии',
    new_comment: 'Новый комментарий...',
    // trash
    items_are_stored: 'Элементы сохраняются в корзине до 30 дней',
    empty_entire_trash: 'Очистить вcю корзину',
    restore: 'Восстановить',
    // workspace
    workspace: 'Рабочее пространство',
    members: 'Участники',
    new_folder: 'Новая папка',
    unpin: 'Открепить',
    name: 'Имя',
    role: 'Роль',
    last_activity: 'Последняя активность',
    new_member: 'Новый участник',
    basic_settings: 'Базовые настройки',
    color: 'Цвет',
    confidentiality: 'Конфиденциальность',
    invite_new_members: 'Кто может приглашать новых участников',
    download_files: 'Кто может скачивать файлы',
    share_files: 'Кто может делиться файлами',

    // modal

    send_by_email: 'Отправить по электронной почте',
    email_comma_separated: 'Электронная почта, через запятую',
    send: 'Отправить',
    get_embed_code: 'Получить код для вставки',
    delete_screenshot: 'Удалить скриншот',
    sure_delete_screenshot: 'Вы уверены, что хотите удалить этот скриншот?',
    yes: 'Да',
    cancel: 'Отмена',
    move_modal: 'Переместить',
    folders: 'Папки',
    delete_workspace: 'Удалить рабочее пространство',
    want_delete_workspace:
      'Вы уверены, что хотите удалить рабочее пространство?',
    close: 'Закрыть',
    save: 'Сохранить',
    // profile

    notifications: 'Уведомления',
    profile: 'Профиль',
    log_out: 'Выйти',
    my_profile: 'Мой профиль',
    first_name: 'Имя',
    last_name: 'Фамилия',
    email: 'Электронная почта',
    password: 'Пароль',
    change_photo: 'Изменить фото',
    change_password: 'Изменить пароль',
    enter_password: 'Введите пароль',
    // create workspace
    create_workspace: 'Создать рабочее пространство',
    enter_workspace_name: 'Пожалуйста, введите имя рабочего пространства',
    next: 'Дальше',
    create_first_folder: 'Создайте первую папку',
    enter_folder_name: 'Введите пожалуйста имя папки',
    skip: 'Пропустить',
    add_members: 'Добавить участников',
    create: 'Создать',

    //sign in, sign up

    sign_in: 'Войти',
    sign_in_with_google: 'Войти с помощью Google',
    sign_in_with_facebook: 'Войти с помощью Facebook',
    or_use: 'или используйте свой логин и пароль',
    remember_me: 'Запомнить меня',
    forgot_password: 'Забыли пароль?',
    dont_have_account: 'Нет аккаунта?',
    sign_up: 'Зарегистрироваться',
    confirm__password: 'Подтвердите пароль',
    privacy_policy: 'Я согласен с Правилами и Политикой конфиденциальности',
    have_an_account: 'Уже есть аккаунт?',
    nickname: 'никнейм',
    fullname: 'Полное имя',
    check: 'Выбрать',

    // Subscription plan

    subscription_plan: 'План подписки',
    choose_plan: 'Выберите план подписки, который вам подходит',
    monthly: 'На месяц',
    annual: 'На год',
    free: 'Бесплатный',
    current_plan: 'Текущий план',
    get_25_additional_videos:
      'За каждого друга можно получить 25 дополнительных видео',
    recommended: 'Рекомендуем',
    premium: 'Премиум',
    active: 'Активировать',
    pay_for_a_year: 'Вы можете оплатить на год вперед (сэкономьте 20%)',
    standart: 'Стандарт',
    user_subscription: 'пользователь',
  };
  return translation;
};

export default translationRu;

// Don&apos;t have an account?

// &nbsp; Sign Up
