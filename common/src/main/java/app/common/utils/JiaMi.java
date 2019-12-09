package app.common.utils;


import org.apache.commons.codec.digest.DigestUtils;

import java.util.Date;

public class JiaMi {

    public static String jiaMiOne(String password){
        return DigestUtils.md5Hex(password);
    }

    public static String jiaMi(String password){
        for (int j = 0; j < 5; j++) {
            password=jiaMiOne(password);
            char[] chars=password.toCharArray();
            for (int i = 0; i < chars.length / 2; i++) {
                char c=chars[i];
                chars[i]=chars[chars.length-i-1];
                chars[chars.length-i-1]=c;
            }
            password=String.valueOf(chars);
        }
        return password;
    }

    public static void main(String[] args) {
        Date date1 =new Date(System.currentTimeMillis());
        Date date2 =new Date(System.currentTimeMillis()+200000000);
        System.out.println(date1);
        System.out.println(date2);
        if (date2.getMinutes()-date1.getMinutes()>=30){
            System.out.println((date2.getDate()-date1.getDate())*24+(date2.getHours()-date1.getHours())+1);
        }else {
            System.out.println((date2.getDate()-date1.getDate())*24+(date2.getHours()-date1.getHours()));
        }
    }
}
