package app.common.pojo;

import lombok.Data;

import java.util.Date;
@Data
public class In_user {
    private Integer id;

    private String account;

    private String PASSWORD;

    private Integer sex;

    private String NAME;

    private String number;

    private String idcard;

    private String email;

    private Date iTime;

    private Integer STATUS;

    private Integer rid;

    private Integer cid;
}