-- CREATE VARIABLES
DO $$
DECLARE p_all_all_id permissions.id%TYPE;
DECLARE p_read_self_id permissions.id%TYPE;
DECLARE p_update_self_id permissions.id%TYPE;
DECLARE p_delete_self_id permissions.id%TYPE;

DECLARE pg_common_id permission_groups.id%TYPE;
DECLARE pg_admin_id permission_groups.id%TYPE;

DECLARE u_admin_id users.id%TYPE;


-- CREATE PERMISSIONS

BEGIN

INSERT INTO permissions(action, resource) VALUES ('all', 'all') RETURNING id INTO p_all_all_id;
INSERT INTO permissions(action, resource) VALUES ('read', 'self') RETURNING id INTO p_read_self_id;
INSERT INTO permissions(action, resource) VALUES ('update', 'self') RETURNING id INTO p_update_self_id;
INSERT INTO permissions(action, resource) VALUES ('delete', 'self') RETURNING id INTO p_delete_self_id;

-- CREATE PERMISSION GROUPS

INSERT INTO permission_groups(name) VALUES ('common') RETURNING id INTO pg_common_id;
INSERT INTO permission_groups(name) VALUES ('admin') RETURNING id INTO pg_admin_id;

-- ASSOCIATE COMMON PERMISSION GROUP WITH COMMON PERMISSIONS

INSERT INTO permission_group_permissions(permission_group_id, permission_id)
VALUES(pg_common_id, p_read_self_id),
(pg_common_id, p_update_self_id),
(pg_common_id, p_delete_self_id);

-- ASSOCIATE ADMIN PERMISSION GROUP WITH ALL PERMISSIONS

INSERT INTO permission_group_permissions(permission_group_id, permission_id)
VALUES(pg_admin_id, p_all_all_id);

-- CREATE ADMIN USER

INSERT INTO users(name, email, password)
VALUES ('Admin', 'admin@admin.com', '$2a$10$B8VQBRpujA/XlmLGkJhmfu3/Bn7in/AT62ri85hNimTBnRzK.C3s6') RETURNING id INTO u_admin_id;

-- ASSOCIATE ADMIN USER WITH ADMIN PERMISSION GROUP

INSERT INTO user_permission_groups(user_id, permission_group_id)
VALUES(u_admin_id, pg_admin_id);

END $$;


