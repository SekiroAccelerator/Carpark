package app.common.pojo;

import lombok.Data;

import java.math.BigDecimal;
@Data
public class Out_user {
    private Integer id;

    private String carNumber;

    private String PASSWORD;

    private String photo;

    private Integer sex;

    private BigDecimal balance;

    private String NAME;

    private String number;

    private String idcard;

    private String email;
}